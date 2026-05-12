import { Button } from "."

type InfoPanelProps = {
  linkRef: string,
  linkText: string,
  text: string,

}
export function InfoPanel({ linkText, linkRef, text }: InfoPanelProps) {
  return <div className="flex flex-col gap-1 xl:gap-2">
    <span className="
          text-xs xl:text-2xs 2xl:text-sm
          text-text
          ">{text}</span>
    <a href={linkRef} className="
          text-xs xl:text-2xs 2xl:text-sm
          text-lavender font-bold hover:underline
          ">{linkText}</a>
  </div>

}
