export function Footer() {
  return (
    <footer className="py-6 sm:py-8 px-3 sm:px-6 border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          © {new Date().getFullYear()} One quick loan Ltd Financial Inc. |{" "}
          <button className="hover:text-foreground transition-colors">Privacy</button> •{" "}
          <button className="hover:text-foreground transition-colors">Terms</button> •{" "}
          <button className="hover:text-foreground transition-colors">Licences (Canada)</button>
        </p>
      </div>
    </footer>
  );
}
