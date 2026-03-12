type helperLinkProps = {
  label: string;
  linkLabel: string;
  href: string;
};

export default function HelperLink({ label, linkLabel, href }: helperLinkProps) {
  return (
    <div className="text-rd-fs-hard flex w-full items-center justify-between">
      <p className="font-light">{label}</p>
      <a href={href} className="font-medium">
        {linkLabel}
      </a>
    </div>
  );
}
