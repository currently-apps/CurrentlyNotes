import { useContext } from "react"
import { AppContext } from 'contexts/AppContext';
import { signIn, signOutClick } from "services/firebase"
import { Dropdown } from "flowbite-react"
import { Bars3Icon } from "@heroicons/react/24/solid"

export default function Statusbar() {
    const context = useContext(AppContext)
    const setState = function(value, requiredState) {
        context.setExtendedState(false)
        if (requiredState === context.editState) {
            context.setEditState(value)
        }
    }
    return (
        <div className="w-full h-30 text-zinc-200 bg-black lg:px-4 px-2 py-2 flex justify-between">
            <div className="lg:font-extrabold lg:w-1/3 lg:text-lg mr-auto flex flex-row cursor-pointer" onClick={ () => { context.setExtendedState(!context.extended) } }>
                <div className="py-auto align-middle my-auto mr-1 tracking-widest uppercase hidden lg:block">Currently</div>
                <Bars3Icon className={`${context.extended ? 'rotate-180' : ''} transition-all w-7 h-7 my-auto lg:ml-2`} />

            </div>

            <div className="mx-auto flex justify-center w-1/3 my-auto">
                {
                    context.currentNote == null
                    ? ""
                    :
                    <div className="lg:text-md flex flex-row gap-4">
                        <div
                        onClick={ () => { setState(false, true) } }
                        className={`transition-all ${context.editState ? "text-zinc-500 cursor-pointer" : "text-white underline underline-offset-8 decoration-2"}`}>
                            Preview
                        </div>
                        <div
                        onClick={ () => { setState(true, false) } }
                        className={`transition-all ${context.editState ? "text-white underline underline-offset-8 decoration-2" : "text-zinc-500 cursor-pointer"}` }>
                            Edit
                        </div>
                    </div>
                }
            </div>

            <div className="lg:flex hidden w-1/3 justify-end ">
                { context.user ? <img className="w-9 h-9 rounded-full mr-4" src={context.user.photoURL} alt="Rounded avatar"/> : ''}
                <div className="my-auto p-0">
                    <Dropdown label={ context.user ? context.user.displayName : 'Not Logged In'} inline={true}>
                        <Dropdown.Header>
                            { 
                                context.user == null
                                ? <div className="cursor-pointer text-md py-2" onClick={ () => {signIn(context)} }> Login</div>
                                : <div className="dropDown">
                                    <div className="flex flex-row">
                                        <div className="hidden lg:block">{ context.user.displayName }</div>
                                    </div>
                                    <span className="block text-sm font-medium truncate">
                                        { context.user.email }
                                    </span>
                                </div>
                            }
                            
                        </Dropdown.Header>
                        <Dropdown.Item>
                            <a href="https://www.currentlynotes.com/">Homepage</a>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Settings
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item  onClick={ () => {signOutClick(context)} }>
                            Sign out
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}