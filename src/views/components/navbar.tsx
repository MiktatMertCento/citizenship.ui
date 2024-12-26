import {Avatar, Box, Button, Center, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, useColorMode, useColorModeValue} from '@chakra-ui/react';
import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {authUser} from "../../recoil/authUser/authUser.atom.ts";
import pages from "../../utils/pages";

/*const NavLink = ({children}: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);*/

export default function Nav() {
    const {colorMode, toggleColorMode} = useColorMode();
    const navigate = useNavigate();
    const [activeUser, setActiveUser] = useRecoilState(authUser);

    const logout = () => {
        setActiveUser(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
    }

    const handleNavigate = (path: string) => {
        navigate(path);
    }

    const onClickHome = () => {
        handleNavigate("/");
    }

    const onClickUpdateUserPassword = () => {
        handleNavigate("/profile/updateUserPassword");
    }

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box onClick={onClickHome} className="font-bold cursor-pointer">{activeUser?.nameSurname}</Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
                            </Button>

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={`https://avatars.dicebear.com/api/male/${activeUser?.userName}.svg`}
                                    />
                                </MenuButton>
                                <MenuList zIndex={3} alignItems={'center'}>
                                    <br/>
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={`https://avatars.dicebear.com/api/male/${activeUser?.userName}.svg`}
                                        />
                                    </Center>
                                    <br/>
                                    <Center>
                                        <p>{activeUser?.userName}</p>
                                    </Center>
                                    <br/>
                                    <MenuItem onClick={onClickHome}>Anasayfa</MenuItem>
                                    <MenuDivider/>
                                    {
                                        pages.map(page => {
                                            return !page.isHidden && <MenuItem key={page.path} onClick={() => handleNavigate(page.path)}>{page.name}</MenuItem>
                                        })
                                    }
                                    <MenuDivider/>
                                    <MenuItem onClick={onClickUpdateUserPassword}>Şifre Değiştir</MenuItem>
                                    <MenuItem onClick={logout}>Çıkış</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
