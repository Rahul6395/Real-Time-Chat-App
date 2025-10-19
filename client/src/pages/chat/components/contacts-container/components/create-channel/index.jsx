import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaPlus } from "react-icons/fa"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Lottie from "react-lottie"
import { animationDefaultOptions } from "@/utils/utils"
import { apiClient } from "@/utils/api-client"
import { SEARCH_CONTACTS_ROUTES } from "@/utils/constants"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { HOST } from "@/utils/constants"
import { getColor } from "@/utils/utils"
import { userAppStore } from "@/store"


const CreateChannel = () => {
    const { setSelectedChatType, setSelectedChatData } = userAppStore();
    const [openNewContactModal, setOpenNewContactModal] = useState(false);
    const [searchedContacts, setSearchedContacts] = useState([])

    const searchContacts = async (value) => {
        try {
            if (value.length > 0) {
                const response = await apiClient.post(SEARCH_CONTACTS_ROUTES, { searchTerm: value }, { withCredentials: true })

                if (response.status === 200 && response.data.contacts) {
                    setSearchedContacts(response.data.contacts)
                }
            } else {
                setSearchedContacts([])
            }

        } catch (err) {
            console.log(err)
        }
    }

    const selectNewContact = (contact) => {
        setOpenNewContactModal(false);
        setSelectedChatType("contact");
        setSelectedChatData(contact)
        setSearchedContacts([])
    }

    return (
        <>
            <Tooltip>
                <TooltipTrigger>
                    <FaPlus className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
                        onClick={() => setOpenNewContactModal(true)} />
                </TooltipTrigger>
                <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
                    Select New Contact
                </TooltipContent>
            </Tooltip>
            <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Please select a contact</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input
                            placeholder="Search Contacts"
                            className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                            onChange={(e) => searchContacts(e.target.value)}
                        />
                    </div>

                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateChannel