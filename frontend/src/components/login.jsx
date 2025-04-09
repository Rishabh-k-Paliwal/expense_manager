
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader } from "lucide-react"
import{useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
const Login = () => {

  const [signupInput, setSignupInput] = useState({
    name: "", 
    email : "", 
    password : ""});

  const [loginInput, setLoginInput] = useState({
    email : "", 
    password : ""
  });

  const [registerUser , {data: registerData , error:registerError , isLoading :registerLoading , isSuccess:registerSuccess}] = useRegisterUserMutation();
  const [loginUser , {data : loginData, error : loginError , isLoading: loginLoading , isSuccess: loginSuccess }] = useLoginUserMutation();
  const Navigate = useNavigate();

  const handleSignupChange = (e,type) => {
    const { name, value } = e.target;
    if (type === "signup"){
      setSignupInput({...signupInput, [name]: value}); 
      }else{
        setLoginInput({...loginInput, [name]: value});
      }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
  
    console.log("Request Payload:", inputData); // Log the request payload
  
    await action(inputData);
  };

  useEffect(() => {
    if(registerSuccess && registerData){
      toast.success(registerData.message || "User registered successfully");
    }
    if (registerError){
      toast.error(registerError.data.message || "Failed to register user");
    }
    if(loginSuccess && loginData){
      toast.success(loginData.message || "User logged in successfully");
      Navigate("/");
    }
    if(loginError){
      toast.error(loginError.data.message || "Failed to login user");
    }
  }, [registerData, registerError, registerLoading, loginData, loginError, loginLoading]);

  return (
    <div className="flex justify-center items-center justify-items-center">
      <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Signup</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create your account here. After saving, you'll be logged in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
              type="text"
              name="name" 
              value={signupInput.name} 
              placeholder = "abc" 
              required  
              onChange={(e) => handleSignupChange(e,"signup")} 
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Email</Label>
              <Input  
              type ="email" 
              name="email"
              value={signupInput.email}
              placeholder = "abc@gmail.com" 
              required  
              onChange={(e) => handleSignupChange(e,"signup")} 
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New Password</Label>
              <Input 
              type="password"
              name="password" 
              value={signupInput.password} 
              onChange={(e) => handleSignupChange(e,"signup")}
              placeholder = "Password"
              required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled = {registerLoading} onClick ={() => handleRegistration("signup")} >
              {registerLoading ? (
                <>
                <Loader className = "w-6 h-6"/> please wait
                </>
              ) : "SignUp"
            }
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login Credintials</CardTitle>
            <CardDescription>
              Login to your LMS account. And start learning.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Email</Label>
              <Input  
              type="email" 
              name="email"
              value={loginInput.email}
              placeholder = "abc@gmail.com" 
              required 
              onChange={(e) => handleSignupChange(e,"login")} 
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Your Password</Label>
              <Input  
              type="password" 
              name="password"
              value={loginInput.password} 
              placeholder = "Password" 
              required  
              onChange={(e) => handleSignupChange(e,"login")} 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled  = {loginLoading} onClick ={() => handleRegistration("login")} >
              {
                loginLoading ? (
                  <>
                  <Loader className = "w-6 h-6"/> please wait
                  </>
                ) : "Login"
              }
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
    
  )
}


export default Login;
