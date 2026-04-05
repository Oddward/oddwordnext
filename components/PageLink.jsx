'use client'

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
        <Link href="#" className={`page-link btn-plain relative group ${active ? 'active':''} ${classes}`} onClick={onClick}>
            <span className="icons-container inline-flex items-center relative top-[calc(50% - 0.6em)] h-[1.2em] w-[1.2em] overflow-hidden transition-all duration-200">
                    <Icon 
                        icon={ iconLabel } size={ iconSize } 
                        class="icon absolute inset-s-0 opacity-100 text-[1em] group-hover:inset-s-[-1em] group-hover:opacity-0 group-focus:inset-s-[-1em] group-focus:opacity-0 transition-all duration-200 ease-in-out" />
                    <Icon 
                        icon={ iconPointer } size={ iconSize } 
                        class="icon absolute text-[--accent-solid] inset-s-[1em] opacity-0 text-[1em] group-hover:inset-s-0 group-hover:opacity-100 group-focus:inset-s-0 group-focus:opacity-100 transition-all duration-200 ease-in-out" />
            </span>
            <span className="label hidden sm:inline-block">{ label }</span>
        </Link>
    )
}