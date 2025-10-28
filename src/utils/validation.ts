import validatePackageName from "validate-npm-package-name";

export interface ValidationResult {
  valid: boolean;
  problems?: string[];
}

export function validateProjectName(name: string): ValidationResult {
  const validation = validatePackageName(name);

  if (validation.validForNewPackages) {
    return { valid: true };
  }

  const problems: string[] = [];

  if (validation.errors) {
    problems.push(...validation.errors);
  }

  if (validation.warnings) {
    problems.push(...validation.warnings);
  }

  // Additional checks
  if (name.length === 0) {
    problems.push("Project name cannot be empty");
  }

  if (name.match(/[A-Z]/)) {
    problems.push("Project name cannot contain uppercase letters");
  }

  return {
    valid: false,
    problems: problems.length > 0 ? problems : ["Invalid project name"],
  };
}
