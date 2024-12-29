import React from "react";

type Properties = {
  message?: string;
};

const ErrorMessage = ({ message }: Properties): React.ReactElement => {
  return message ? <div>{message}</div> : <></>;
};

export { ErrorMessage };
