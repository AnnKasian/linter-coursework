import { parse, AnyNode, Position } from "acorn";
import { fullAncestor } from "acorn-walk";

const walk = (node: AnyNode) => {
  const variables = {
    declared: new Set(),
    used: new Set(),
    imported: new Set(),
  };

  fullAncestor(node, (current, _, ancestors) => {
    const node = current as AnyNode;
    const parent = ancestors[ancestors.length - 2] as AnyNode;

    switch (node.type) {
      case "VariableDeclarator":
        if (node.id.type === "Identifier") {
          variables.declared.add(node.id.name);
        }

        break;
      case "Identifier":
        if (
          parent &&
          parent.type !== "VariableDeclarator" &&
          parent.type !== "ImportSpecifier"
        ) {
          variables.used.add(node.name);
        }

        break;
      case "ImportDeclaration":
        node.specifiers.forEach((specifier) => {
          if (specifier.local.type === "Identifier") {
            variables.imported.add(specifier.local.name);
          }
        });

        break;
    }
  });

  return variables;
};

const analyze = (code: string): string[] => {
  const messages: string[] = [];

  if (code.trim().length === 0) {
    messages.push("❌ Error: Input string is empty.");

    return messages;
  }

  try {
    const program = parse(code, {
      ecmaVersion: "latest",
      sourceType: "module",
      allowAwaitOutsideFunction: true,
      locations: true,
    });

    messages.push("✅ Syntax is valid!");
    const variables = walk(program);

    const unusedVariables = [...variables.declared].filter(
      (variable) => !variables.used.has(variable)
    );
    if (unusedVariables.length > 0) {
      messages.push(
        `⚠️ Warning: Unused variables: ${unusedVariables.join(", ")}`
      );
    }

    const unusedImports = [...variables.imported].filter(
      (imp) => !variables.used.has(imp)
    );
    if (unusedImports.length > 0) {
      messages.push(`⚠️ Warning: Unused imports: ${unusedImports.join(", ")}`);
    }
  } catch (error) {
    const { loc } = error as { loc: Position };

    messages.push("❌ Syntax error detected:");
    messages.push(`🛑 Line: ${loc.line}, Column: ${loc.column}`);
  }

  return messages;
};

export { analyze };
