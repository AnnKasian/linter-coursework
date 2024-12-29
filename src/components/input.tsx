import React from "react";
import Editor from "@monaco-editor/react";
import { Button } from "./button/button";
import { analyze } from "../helpers/analyze.helper";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  name: FieldPath<T>;
  resultName: FieldPath<T>;
};

const Input = <T extends FieldValues>({
  control,
  name,
  resultName,
}: Properties<T>): React.ReactElement => {
  const { field } = useController({ control, name });
  const { field: resultField } = useController({ control, name: resultName });

  const handleEditorChange = (value: string | undefined): void => {
    field.onChange(value || "");
  };

  const handleAnalyzeClick = (): void => {
    const result = analyze(field.value);
    resultField.onChange(result);
  };

  return (
    <div>
      <Editor
        value={field.value}
        height="400px"
        defaultLanguage="javascript"
        theme="vs-dark"
        onChange={handleEditorChange}
      />

      <br />
      <Button label={"Check"} onClick={handleAnalyzeClick} />
    </div>
  );
};
export { Input };
