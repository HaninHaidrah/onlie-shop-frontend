import React, { useContext, useState } from "react";
import { LoginContext } from "../context/loginContext";
import "../App.css";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

function Signin() {
  const { loggedIn, loginFunction, signupFunction } = useContext(LoginContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [switcher, setSwitcher] = useState(false);
  console.log("username>>>", username);
  console.log("password>>>", password);

  function handleSubmit(e) {
    e.preventDefault();
    loginFunction(username, password);
  }
  function handleSubmitSignup(e) {
    e.preventDefault();
    signupFunction(username, password);
  }
  function switchBtn(e) {
    const switcherChange = e ? true : false;
    setSwitcher(switcherChange);
  }
  return (
    <ChakraProvider>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }} bg="#fffcec">
        <>
          {!loggedIn && (
            <>
              {switcher && (
                <Flex p={8} flex={1} align={"center"} justify={"center"} >
                  <Stack spacing={4} w={"full"} maxW={"md"}>
                    <Heading fontSize={"2xl"}>Create a new account</Heading>
                    <form onSubmit={handleSubmitSignup}>
                      <FormControl id="email">
                        <FormLabel>Username</FormLabel>
                        <Input
                          type="text"
                          onChange={(e) => setUsername(e.target.value)}
                          name="username"
                          placeholder="username"
                        />
                      </FormControl>
                      <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          name="password"
                          placeholder="password"
                        />
                      </FormControl>        
                      <Stack spacing={6}>
                        <Stack
                          direction={{ base: "column", sm: "row" }}
                          align={"start"}
                          justify={"space-between"}
                        >
                          <Checkbox>Remember me</Checkbox>
                          <Link color={"#642213de"}>Forgot password?</Link>
                        </Stack>
                        <Button
                          type="submit"
                          bg={"#fef2df"}
                          variant={"solid"}
                        >
                          Sign up
                        </Button>
                      </Stack>
                      <p className="message">
                        Already registered?{" "}
                        <Link color={"#642213de"}>
                          <a onClick={() => switchBtn(false)} href="#">
                            Sign in
                          </a>
                        </Link>
                      </p>
                    </form>
                  </Stack>
                </Flex>
              )}
              {!switcher && (
                <Flex p={8} flex={1} align={"center"} justify={"center"}>
                  <Stack spacing={4} w={"full"} maxW={"md"}>
                    <Heading fontSize={"2xl"}>Sign in to your account</Heading>
                    <form onSubmit={handleSubmit}>
                      <FormControl id="email">
                        <FormLabel>Username</FormLabel>
                        <Input
                          type="text"
                          onChange={(e) => setUsername(e.target.value)}
                          name="username"
                          placeholder="username"
                        />
                      </FormControl>
                      <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          name="password"
                          placeholder="password"
                        />
                      </FormControl>

                      <Stack spacing={6}>
                        <Stack
                          direction={{ base: "column", sm: "row" }}
                          align={"start"}
                          justify={"space-between"}
                        >
                          <Checkbox>Remember me</Checkbox>
                          <Link color={"#642213de"}>Forgot password?</Link>
                        </Stack>
                        <Button
                          type="submit"
                          bg={"#fef2df"}
                          variant={"solid"}
                        >
                          Sign in
                        </Button>
                      </Stack>
                      <p className="message">
                        Not registered?{" "}
                        <Link color={"#642213de"}>
                          <a onClick={() => switchBtn(true)} href="#">
                            Create an account
                          </a>
                        </Link>
                      </p>
                    </form>
                  </Stack>
                </Flex>
              )}
            </>
          )}
        </>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={"../Girlsih.png"}
          />
        </Flex>
      </Stack>
    </ChakraProvider>
  );
}

export default Signin;
