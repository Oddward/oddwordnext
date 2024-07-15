import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import styles from './post-card.module.css'
import { useCallback, useEffect, useRef, useState } from "react"

export default function PostCard({ 
    title = "No Post Title", 
    desc = '', 
    href = '#', 
    src = '' })
    {
    const [ data, setData ] = useState({ title, desc, href, src})
    const shareHandler = async () => {
        // const shareData = { 
        //     title, 
        //     text: 'Check out this piece from Oddward', 
        //     url
        // }
        console.log(data)
        if( navigator.share ){
            navigator.share({
                title: data.title, 
                text: 'Check out this piece from Oddward', 
                url: data.href 
            })
            .then(() => console.log('Thanks for sharing~'))
            .catch( err => {
                alert(`Error: ${err} (If you're on Firefox, please enable webshare)`)
            })
        } else {
            alert(`Error: ${err} (Seems like your browser doesn't support webshare! If you're on Firefox, please enable webshare in the settings.)`)
        }
        // try {
        //     await navigator.share({ 
        //         title: data.title, 
        //         text: 'Check out this piece from Oddward', 
        //         url: data.href })

        // } catch (err) {
        //     alert(`Error: ${err} (If you're on Firefox, please enable webshare)`)
        // }
    }
    const createBookmark = () => {
        if( window.sidebar && window.sidebar.addPanel ) {
            window.sidebar.addPanel(props.title, props.url, '')
        } 
        else if(window.external && ('AddFavorite' in window.external)) {
            window.external.AddFavorite(props.url,props.title)
        } 
        // else if( window.opera && window.print || window.sidebar && ! (window.sidebar instanceof Node)) {
        //     bookmark.attr('rel', 'sidebar').attr('title', props.title).attr('location', props.url)
        //     return true
        // } 
        else {
            try {
                browser.bookmarks.create({
                    title: props.title,
                    url: props.url
                })
            } catch(err) {
                alert('Could not save it for you. You can add this page to your bookmarks by pressing ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D on your keyboard.');
            }
        }
        return false
    }

    return(
        <div className="card-post-result inline-flex flex-col md:flex-row w-52 max-w-52 min-w-fit h-auto md:w-4/5 md:max-w-none md:min-w-0 md:h-32 lg:h-48 overflow-hidden my-4 rounded-md bg-gray-900 border-2 border-slate-700 hover:border-slate-300">
            <a href={ href } className={`aspect-[4/3] w-full h-auto md:h-full md:w-auto`}>
                <header className={`w-full h-full bg-cover bg-center`} style={{backgroundImage:`url(${src})`}}></header>
            </a>
            
            <div className="content flex flex-col justify-between gap-2 md:justify-start w-[300px] md:w-full px-4 py-2 md:py-4 lg:py-8 lg:px-8">
                <a href={ href }>
                    <h3 className={`hover:underline /*decoration-transparent*/`}>{ title }</h3>
                </a>
                <p className="w-full h-24 text-sm lg:text-base md:h-auto overflow-hidden text-ellipsis mb-2">{ desc }</p>
            </div>

            <div className="buttons flex flex-row md:flex-col items-center whitespace-nowrap border-t md:border-l border-slate-700 w-[300px] md:w-24">
                <span className="flex justify-center items-center w-full h-full hover-accent-bg p-2 lg:p-4 cursor-pointer" onClick={shareHandler}>
                    <Icon icon="icon-park-outline:share-one" />
                </span>
                
                <a href="#" className="flex justify-center items-center w-full h-full hover-accent-bg p-2 lg:p-4 cursor-pointer" onClick={createBookmark} title="props.title" rel="sidebar">
                    <Icon icon="icon-park-outline:bookmark-one" />
                </a>
                
                <a href={ href } className="flex justify-center items-center w-full h-full hover-accent-bg p-2 lg:p-4 cursor-pointer">
                    <Icon icon="icon-park-outline:arrow-right" />
                </a>
            </div>
        </div>
    )
}
