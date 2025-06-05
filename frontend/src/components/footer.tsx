export function Footer() {
  return (
    <footer className="w-full border-t text-sm text-gray-500 dark:text-gray-400 mt-auto py-4 px-6 text-center">
      <p>
        © {new Date().getFullYear()} Investment Manager. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}
