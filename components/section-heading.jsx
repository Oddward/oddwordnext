import styles from './section-heading.module.css'

export default function SectionHeading({ children }) {
    return(
        <header className="block uxl:flex uxl:flex-col uxl:items-end uxl:gap-8 text-2xl uxl:text-4xl text-slate-300 uxl:h-full uxl:w-fit">
            <h2 className="inline-block whitespace-nowrap uxl:whitespace-pre-line uxl:v-text">{children}</h2>
            <div className="bg-slate-500 w-full h-[1px] lg:h-[2px] mb-2 uxl:w-[2px] uxl:h-full uxl:mb-0 uxl:mr-2"></div>
        </header>
    )
}