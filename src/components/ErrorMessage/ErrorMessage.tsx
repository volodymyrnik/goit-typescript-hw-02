import { Toaster } from "react-hot-toast";
import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  error: string | boolean;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className={css.errorMessageStyle}>
      <Toaster />
      <p>{error}</p>
    </div>
  );
}