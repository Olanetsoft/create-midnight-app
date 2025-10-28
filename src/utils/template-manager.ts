import path from "path";
import fs from "fs-extra";
import Mustache from "mustache";

export class TemplateManager {
  constructor(private templateName: string) {}

  async scaffold(projectPath: string, projectName: string): Promise<void> {
    const templatePath = path.join(
      __dirname,
      "../../templates",
      this.templateName
    );

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template "${this.templateName}" not found`);
    }

    const templateVars = {
      projectName,
      timestamp: new Date().toISOString(),
      year: new Date().getFullYear(),
      capitalizedName:
        projectName.charAt(0).toUpperCase() + projectName.slice(1),
      kebabName: projectName.toLowerCase().replace(/\s+/g, "-"),
    };

    await this.copyTemplate(templatePath, projectPath, templateVars);
  }

  private async copyTemplate(
    templatePath: string,
    projectPath: string,
    templateVars: Record<string, any>
  ): Promise<void> {
    const files = await fs.readdir(templatePath, { withFileTypes: true });

    for (const file of files) {
      const sourcePath = path.join(templatePath, file.name);
      let destPath = path.join(projectPath, file.name);

      // Handle special file names
      if (file.name === "_gitignore") {
        destPath = path.join(projectPath, ".gitignore");
      } else if (file.name === "_env.template") {
        destPath = path.join(projectPath, ".env.example");
      }

      if (file.isDirectory()) {
        await fs.ensureDir(destPath);
        await this.copyTemplate(sourcePath, destPath, templateVars);
      } else {
        if (file.name.endsWith(".template")) {
          // Render template file
          const content = await fs.readFile(sourcePath, "utf8");
          const rendered = Mustache.render(content, templateVars);
          const finalPath = destPath.replace(".template", "");
          await fs.writeFile(finalPath, rendered);
        } else {
          // Copy binary file as-is
          await fs.copy(sourcePath, destPath);
        }
      }
    }
  }
}
