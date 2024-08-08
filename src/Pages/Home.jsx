
import {
    Navbar,
    Typography,
    Button,
    Card,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components";
import { toast } from "react-toastify";



const TABLE_HEAD = ["Name", "Job", "Images", ""];


const Home = () => {
    const [categories, setCategories] = useState([])

    const [open, setOpen] = useState(false);

    const navigate = useNavigate()

    const handleOpen = () => setOpen(!open);

    const logoutHandler = () => {
        localStorage.removeItem('token')

        navigate('/login')
    }

    const getCategory = async () => {

        try {
            const res = await axios.get('categories')

            console.log(res?.data?.data);

            setCategories(res?.data?.data)

        } catch (error) {
            console.error(error);

        }
    }

    useEffect(() => {
        getCategory()
    }, [])

    const deleteCategory = async (id) => {
        

        try {
            const res = await axios.delete(`/categories/${id}`)
            getCategory()

            toast.success(res?.data?.message, {
                theme: 'dark'
            })

        } catch (error) {
            console.error(error);


            toast.error(error?.response?.data?.message, {
                theme: 'dark'
            })
        }
    }


    return (
        <div className="bg-gray-100 pb-20 ">
            <div className="max-w-7xl mx-auto">


                <Navbar className="sticky top-0 z-10 h-max rounded-b-lg rounded-t-none px-4 py-2 lg:px-8 lg:py-4">
                    <div className="flex items-center justify-between text-blue-gray-900">
                        <Typography
                            as="a"
                            href="#"
                            className="mr-4 cursor-pointer py-1.5 font-medium capitalize text-2xl "
                        >
                            dezinfeksiya
                        </Typography>
                        <div className="flex items-center gap-4">
                            <div className="mr-4 hidden lg:block"></div>
                            <div className="flex items-center gap-x-5">
                                <h1 className="text-2xl">Admin</h1>
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    className="hidden lg:inline-block"
                                    onClick={logoutHandler}
                                    color="red"
                                >
                                    <span className="text-sm">Log out</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Navbar>

                <div className="pt-10 pb-2 flex justify-end px-5 ">
                    <Button color="green" className="" onClick={handleOpen} >Create Category</Button>
                </div>

                <Card className="h-full w-full overflow-hidden ">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(({ name_en, name_ru, image_src, id }, index) => (
                                <tr key={index} className="even:bg-blue-gray-50/50">
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {name_en}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {name_ru}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <img src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${image_src}`} alt="" className="w-28" />
                                    </td>
                                    <td className="p-4">
                                        <Button color="red" variant="outlined" onClick={() => deleteCategory(id)} >Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>

            </div>

            <Modal open={open} handleOpen={handleOpen} getCategory={getCategory} />

        </div>
    )
}

export default Home
