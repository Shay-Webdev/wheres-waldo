import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import { ZodError } from "zod";
import { type ReactNode, useState } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { MyButton } from "../../Components/Button/Button.tsx";

type ErrorDivProps = {
  children: ReactNode;
};

const ErrorDiv = (props: ErrorDivProps) => {
  const { children } = props;
  return (
    <section className="min-w-screen min-h-screen flex flex-col justify-center items-center gap-2 bg-zinc-900 text-purple-600 text-4xl  ">
      {children}
      <Link className="hover:underline underline-offset-8" to="/">
        {" "}
        Go back to home
      </Link>
    </section>
  );
};

const ErrorPage = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorDiv>
        <h1>Error {error.status}</h1>
        <p>{error.statusText || error.data.message}</p>
      </ErrorDiv>
    );
  } else if (error instanceof ZodError) {
    return (
      <ErrorDiv>
        <h1>Validation failed</h1>
        <p>
          {error.errors.map((error) => {
            return <p>{error.message}</p>;
          })}
        </p>
      </ErrorDiv>
    );
  } else if (error instanceof Error) {
    return (
      <ErrorDiv>
        <h1>Error</h1>
        <p>{error.message}</p>
      </ErrorDiv>
    );
  } else {
    return (
      <ErrorDiv>
        <h1>Something went wrong!</h1>
      </ErrorDiv>
    );
  }
};

type ErrorBoundaryProps = {
  children: ReactNode;
} & Pick<FallbackProps, "resetErrorBoundary">;

const ErrorBoundaryDiv = (props: ErrorBoundaryProps) => {
  const { children, resetErrorBoundary } = props;
  return (
    <section className="min-h-16 max-w-80 max-h-80 p-4 m-auto  flex flex-col justify-center items-center gap-4 bg-amber-600 text-red-700 outline-orange-700 rounded-xl border-2 border-solid border-red-900">
      {children}
      <MyButton
        onClick={() => {
          console.log(`reset triggered`);
          resetErrorBoundary();
        }}
      >
        Reset
      </MyButton>
    </section>
  );
};

const ErrorFallback = (props: FallbackProps) => {
  const { error, resetErrorBoundary } = props;
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorBoundaryDiv resetErrorBoundary={resetErrorBoundary}>
        <h1>Error {error.status}</h1>
        <p>{error.statusText || error.data.message}</p>
      </ErrorBoundaryDiv>
    );
  } else if (error instanceof ZodError) {
    return (
      <ErrorBoundaryDiv resetErrorBoundary={resetErrorBoundary}>
        <h1>Validation failed</h1>
        <p>
          {error.errors.map((error) => {
            return <p>{error.message}</p>;
          })}
        </p>
      </ErrorBoundaryDiv>
    );
  } else if (error instanceof Error) {
    return (
      <ErrorBoundaryDiv resetErrorBoundary={resetErrorBoundary}>
        <h1>Error</h1>
        <p>{error.message}</p>
      </ErrorBoundaryDiv>
    );
  } else {
    return (
      <ErrorBoundaryDiv resetErrorBoundary={resetErrorBoundary}>
        <h1>Something went wrong!</h1>
      </ErrorBoundaryDiv>
    );
  }
};

const ErrorBoundaryWrapper = ({ children }: { children: ReactNode }) => {
  const [key, setKey] = useState(0);
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => setKey((k) => k + 1)}
      key={key}
    >
      {children}
    </ErrorBoundary>
  );
};

export { ErrorPage, ErrorFallback, ErrorBoundaryWrapper };
