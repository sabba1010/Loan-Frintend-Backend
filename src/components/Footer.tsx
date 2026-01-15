export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} One quick loan Ltd Financial Inc. |{" "}
          <button className="hover:text-foreground transition-colors">Privacy</button> •{" "}
          <button className="hover:text-foreground transition-colors">Terms</button> •{" "}
          <button className="hover:text-foreground transition-colors">Licences (Canada)</button>
        </p>
      </div>
    </footer>
  );
}
