import React from "react";
import { Input, FileInput, Output } from "./components";
import { useAppForm } from "./hooks/use-app-form.hook";

const App = (): React.ReactElement => {
  const { control, watch } = useAppForm<{ text: string; result: string[] }>({
    defaultValues: { text: "// Start coding in JavaScript", result: [] },
  });

  const result = watch("result");

  return (
    <div>
      <Input control={control} name="text" resultName="result" />
      <FileInput control={control} name="text" />
      {result && <Output result={result} />}
    </div>
  );
};

export { App };
