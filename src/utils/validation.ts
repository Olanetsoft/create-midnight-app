// This file is part of create-mn-app.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
