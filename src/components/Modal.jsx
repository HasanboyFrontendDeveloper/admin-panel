import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import axios from "../service/api";
// import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Modal = ({ open, handleOpen, getCategory }) => {
    const [values, setValues] = useState({
        name_en: 'hello',
        name_ru: 'hi',
    })
    const [picture, setPicture] = useState('')

    const inputHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }


    const submitHandler = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')

        console.log(token);


        const postData = new FormData()

        postData.append('name_en', values.name_en)
        postData.append('name_ru', values.name_ru)
        postData.append('images', picture)


        try {
            const res = await axios.post('/categories', postData)
            console.log(res);
            toast.success(res?.data?.message, {
                theme: 'dark'
            })
            handleOpen()
            getCategory()

        } catch (error) {
            console.error(error);
            toast.success(error?.message, {
                theme: 'dark'
            })

        }

    }


    return (
        <>

            <Dialog open={open} handler={handleOpen} size="sm" >
                <form onSubmit={submitHandler}>
                    <DialogHeader className="text-center">Create Category</DialogHeader>
                    <DialogBody className="flex flex-col gap-4">
                        <Input label="Name En" size="lg" name="name_en" onChange={inputHandler} value={values.name_en} required />
                        <Input label="Name ru" size="lg" name="name_ru" onChange={inputHandler} value={values.name_ru} required />
                        <input
                            type="file"
                            className=""
                            onChange={(e) => setPicture(e?.target?.files[0])}
                            accept="image/png, image/jpeg"
                        />
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" type="submit">
                            <span>Submit</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    )
}

export default Modal