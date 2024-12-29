import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";
import React from "react";
import { ErrorMessage } from "../error-message";
import { Button } from "../button/button";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  label?: string;
  name: FieldPath<T>;
};

const FileInput = <T extends FieldValues>({
  control,
  label,
  name,
}: Properties<T>): React.ReactElement => {
  const { field, fieldState } = useController({ control, name });

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    field.onChange(text);
  };

  return (
    <label className={styles["input-label"]}>
      {label}
      <div className={styles["input-container"]}>
        <Button label="Upload File" />
        <input
          accept=".txt,.js"
          className={styles["input-field"]}
          name={field.name}
          onChange={handleChange}
          type="file"
        />
      </div>
      <ErrorMessage message={fieldState.error?.message} />
    </label>
  );
};

export { FileInput };
