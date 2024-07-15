export default function ProjectCard({ href='', title='' }) {
    return(
        <a href={href} 
            className="inline-block w-[300px] h-[225px] lg:w-[400px] lg:h-[300px] rounded-lg text-xl lg:text-2xl font-semibold text-slate-100 overflow-hidden border-2 border-slate-900 hover:border-slate-500" 
            style={{ backgroundImage: 'url('+$attrs.src+')', backgroundSize: 'contain', backgroundRepeat:'no-repeat' }} 
            _blank
            >
            <div className="w-full h-full bg-gradient-to-t from-black to-[#00000000]">
                <div className="flex justify-between gap-4 items-end h-full p-4 mt-full">
                    <h3>{{ title }}</h3>
                    <span className="flex justify-center items-center shrink-0 w-8 h-8 rounded-full bg-[#00000088]"><Icon name="icon-park-outline:arrow-right-up" /></span>
                </div>
            </div>
        </a>
    )
}