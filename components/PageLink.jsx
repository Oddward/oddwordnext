
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Link from "next/link";
import { useState } from "react";

export default function PageLink({ 
    iconLabel = 'ri:arrow-right-line', 
    iconPointer = 'ri:arrow-right-line',
    iconSize = '1.2em',
    label = 'Home',
    onClick,
    active,
    classes }) 
    {
    // const [active, setActive] = useState( false )

    return(
        <Link href="#" className={`page-link relative inline-flex content-center items-center gap-2 px-2 py-1 group ${active ? 'active':''} ${classes}`} onClick={onClick}>
            <span className="icons-container inline-block relative top-[calc(50% - 0.6em)] h-[1.2em] w-[1.2em] overflow-hidden transition-all duration-200">
                    <Icon 
                        icon={ iconLabel } size={ iconSize } 
                        class="icon absolute scale-100 text-[1.2em] group-hover:scale-0" />
                    <Icon 
                        icon={ iconPointer } size={ iconSize } 
                        class="icon absolute text-[--accent-solid] left-[1.2em] text-[1.2em] group-hover:left-0" />
            </span>
            <span className="label hidden sm:inline-block">{ label }</span>
        </Link>
    )
}