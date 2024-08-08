import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import axios from "../service/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [values, setValues] = useState({
        phone: '900474227',
        password: 'superadmin',
    })

    const navigate = useNavigate()

    const inputHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const user = {
            phone_number: values.phone,
            password: values.password,
        }

        try {
            const res = await axios.post('auth/signin', user)
            console.log(res.data);
            localStorage.setItem('token', res?.data?.data?.tokens?.accessToken?.token)

            toast.success(res?.data?.message, {
                theme: 'dark'
            })
            navigate('/')
            
        } catch (error) {
            console.error(error);

            toast.error(error?.response?.data?.message, {
                theme:'dark'
            })

        }

    }



    return (
        <div className="flex justify-center items-center h-[100vh] bg-gray-200">
            <form onSubmit={submitHandler} >
                <Card className="w-96">
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Sign In
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Phone number" size="lg" name="phone" onChange={inputHandler} value={values.phone} />
                        <Input label="Password" size="lg" type="password" name="password" onChange={inputHandler} value={values.password} />
                        <div className="-ml-2.5">
                            <Checkbox label="Remember Me" />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" fullWidth type="submit" >
                            Sign In
                        </Button>
                        {/* <Typography variant="small" className="mt-6 flex justify-center">
                        Don&apos;t have an account?
                        <Typography
                            as="a"
                            href="#signup"
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold"
                        >
                            Sign up
                        </Typography>
                    </Typography> */}
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}

export default Login