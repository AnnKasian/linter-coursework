import React from "react";

const Output = ({ result }: { result: string[] }): React.ReactElement => {
  return (
    <div>
      {result.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
};

export { Output };
