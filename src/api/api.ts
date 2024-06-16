import axios, { AxiosResponse } from "axios";
import { decryptAES } from "../AES/AES";
import { FAddReviewProps, FCheckoutProps, FCreateCartProps, FCreateProductProps, FEmailVerificationProps, FGetImageProps, FLoginProps, FRegisterEmailProps, FRemoveFromCartProps, FResetPasswordProps, FVerifyEmailProps } from "../models/models";
import { CategoryProps } from "../components/DashboardNav";
import { apiPost, saveCartData } from "src/lib/helper-function";
import { useUserOrders, useUserProducts } from "src/store/user-store";


export const registerEmail = (params: FRegisterEmailProps) => {
  params.setLoading(true)
  
  axios
    .post(
      process.env.REACT_APP_AFROMARKETS_URL + "/user/subscribe",
      params.obj,
    )
    .then((response) => {
      if (response.status === 200) {
      params.toast.success('Congratulations!', 
      {description: 'You have joined the queue, see you soon'})
        console.log("Response:", response.data);
      }
      params.setOpen(false)
    })
    .catch((error) => {
      params.toast.error('Failed! try again')
      console.error("Error:", error);
    }).finally(()=>{
      params.setLoading(false)
    })
};

export const registerUser = async (encryptedInfo: string) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  try{
  const response = await apiPost(process.env.REACT_APP_AFROMARKETS_URL + "/user/onboarding", encryptedInfo, headers)
  return response

  } catch(error: any){
      return error.response
  }
}

    

export const handlePasswordReset = (params: FResetPasswordProps) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  
  params.setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/user/resetPassword", params.data, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
      if(res.status === 200) {
        params.toast.success('You have successfully reset your password')
        params.reset()
        setTimeout(() => {
          params.navigate('/login')
        }, 2000);
      }
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    params.toast.error('Password reset failed!')
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const handleLoginNew = async (input: string) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  };

  try {
    const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/user/login", input, {headers})

      if (response.data) {
        const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);

        if(decryptedData){
        const responseData = JSON.parse(decryptedData);
        return responseData.responseBody
        }

      }
    } catch (error) {
    console.log('user-form-err22: ', error);
  }
}

export const handleAdminLoginNew = async (input: string) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  };

  try {
    const response = await axios.post("https://afromarketsquare.com:9200/admin/login", input, {headers})

      if (response.data.status === 200) {
        const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);

        if(decryptedData){
        const responseData = JSON.parse(decryptedData);
        return responseData.responseBody
        }

      }
    } catch (error) {
    console.log('user-form-err22: ', error);
  }
}

export const handleAdminRegister = async (input: string) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  };

  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_AFROMARKETS_ADMIN_URL + "/register", input, {headers})

      if (response.data) {
        const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);

        if(decryptedData){
        const responseData = JSON.parse(decryptedData);
        return responseData.responseBody
        }

      }
    } catch (error) {
    console.log('user-form-err22: ', error);
  }
}

export const handleLogin2 = (params:FLoginProps) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  
  params.setLoading(true)
  axios.post<string>("https://afromarketsquare.com:9200/admin/login", params.encryptedInfo, {headers}
    )
  .then((res: AxiosResponse<string>) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      const cart = response.responseBody.cartResponse
      params.setLoginAuth?.(response.responseBody.authorization)
      params.setIsBusiness?.(response.responseBody.isBusiness)
      params.setKycVerified?.(response.responseBody.kycVerified)
      localStorage.setItem('Afro_Login_Response', JSON.stringify(response))
      localStorage.setItem('Afro_Cart', JSON.stringify(response.responseBody.cartResponse))
      localStorage.setItem('My_Login_Auth', JSON.stringify(response.responseBody.authorization))
      if(response.responseBody.cartResponse.cartReference){
        localStorage.setItem("Afro_Login_Cart_Reference", JSON.stringify(response.responseBody.cartResponse.cartReference))
      }else{
        localStorage.setItem("Afro_Login_Cart_Reference", JSON.stringify(''))
      }
      if (Object.keys(cart).length >= 1){
      localStorage.setItem('Afro_Cart_Orders', JSON.stringify(response.responseBody.cartResponse.orders))
    }
      
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
      if(res.status === 200) {
        params.toast.success('Login was successful')
        params.reset()
        setTimeout(() => {
          params.navigate('/dashboard')
        }, 2000);
      }
    }
  })
  .catch((err) => {
    const myData = decryptAES(err.response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      console.log('user-form-err: ', JSON.parse(myres!))

    }).catch((err) => {console.log('real err: ', err)})

    console.log('user-form-err22: ', err)

      
    params.toast.error('Login failed!')
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const handleLogin = async (encryptedInfo: string) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
    'Content-Type': 'text/plain'
  };

  try {
    const response = await apiPost(process.env.REACT_APP_AFROMARKETS_URL + "/user/login", encryptedInfo, headers);
    return response

  } catch (error: any) {
    return error.response;
    } 

  } 

export const handleEmailVerification = (params: FEmailVerificationProps) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  params.setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/user/verifyEmail", params.encryptedInfo, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      window.localStorage.setItem('Afro_User_Email', response.responseBody.email)
      window.localStorage.setItem('Afro_User_Name', response.responseBody.fullName)
      window.localStorage.setItem('Afro_isBusiness', response.responseBody.isBusiness)
      if(res.status === 200) {
        params.toast.success('Email verified successfully')
        setTimeout(() => {
          if(params.pathName === '/verify-email'){
          params.navigate('/reset-password')
          } else {
            params.navigate('/login')
          }
        }, 2000);
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    params.toast.error('Email verification failed')
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const handleVerifyEmail = (params: FVerifyEmailProps) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  params.setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/user/requestVerification", params.data, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      if(res.status === 200) {
        params.toast.success('Token has been sent to your email')
        setTimeout(() => {
          params.navigate('/verify-email')
        }, 2000);
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    params.toast.error('Verification request failed!')
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const registerBusiness = async (encryptedInfo: string) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  try{
    const response = await apiPost(process.env.REACT_APP_AFROMARKETS_URL + "/merchant/onboarding", encryptedInfo, headers)
    return response
  
    } catch(error: any){
        return error.response
    }
}

export const getAllBuisnessProducts = async (data:string) => {
  const {setProduct} = useUserProducts.getState()
  try {
    const headers = {
      'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
      'Content-Type': 'text/plain'
    };

    const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/product/fetchProducts", data, { headers });

    if (response.data) {
      const myData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
      const parsedData = JSON.parse(myData!);
      setProduct(parsedData.responseBody)
      return parsedData.responseBody; 
    }
  } catch (error) {
    console.log('Error:', error);
    throw new Error('Error fetching products');
  }
}

export const getAllBuisnessProducts01 = async (data:string) => {
  try {
    const headers = {
      'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
      'Content-Type': 'text/plain'
    };

    const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/product/fetchProducts", data, { headers });
    return response

  }catch (error: any) {
    return error.response;
  }
}

export const getAllItems = async (data?:string) => {
  const {setProduct} = useUserProducts.getState()
  try {const headers = {
      'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
      'Content-Type': 'text/plain'
    };

    const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/product/fetchAllProducts", data, { headers });

    if (response.data) {
      const myData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
      const parsedData = JSON.parse(myData!);
      setProduct(parsedData.responseBody)
      return parsedData.responseBody;
    }
  } catch (error) {
    console.log('Error:', error);

    throw error
  }
};

export const getAllItems01 = async (data?:string) => {
    const headers = {
      'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
      'Content-Type': 'text/plain'
    };

  try {
    const response = await apiPost(process.env.REACT_APP_AFROMARKETS_URL + "/product/fetchAllProducts", data, headers)
    return response
  
  }catch (error: any) {
    return error.response;
  }
}

export const getAllLocation = async (data?:string) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
    'Content-Type': 'text/plain'
  };

try {
  const response = await apiPost(process.env.REACT_APP_AFROMARKETS_URL + "/address/fetchPickUpAddress", data, headers)
  return response

}catch (error: any) {
  return error.response;
}
}

export const updateCartProperties = async (data?:string) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
    'Content-Type': 'text/plain'
  };

try {
  const response = await apiPost(process.env.REACT_APP_AFROMARKETS_URL + "/cart/addPropertiesToCart", data, headers)
  return response

}catch (error: any) {
  return error.response;
}
}

export const getSingleItems = async (data:string) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
    'Content-Type': 'text/plain'
  };

try {
  const response = await axios.get(process.env.REACT_APP_AFROMARKETS_URL + `/product/fetchSingleProduct/?product_id=${data}`, { headers });

  return response

}catch (error: any) {
  return error.response;
}
}

export const getProducts = async () => {
  try {const headers = {
      'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
      'Content-Type': 'text/plain'
    };

    const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/product/fetchAllProducts", { headers });
    

    if (response.data) {
      const myData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
      const parsedData = JSON.parse(myData!);
      console.log("Success: ", parsedData)

      return parsedData.responseBody;
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error
  }
};

export const getAllItemsNew = async (data:string) => {
  try {
    const headers = {
      'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
      'Content-Type': 'text/plain'
    };

    const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/product/fetchAllProducts", data, { headers });

    if (response.data) {
      const myData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
      const parsedData = JSON.parse(myData!);
      return parsedData.responseBody;
    }
  } catch (error) {
    console.log('Error:', error);
    throw new Error('Error fetching products');
  }
};


export const createCart = (params: FCreateCartProps) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  params.setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/cart/createCart", params.encryptedInfo, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      params.setCount(1)
      localStorage.setItem('Afro_Login_Cart_Reference', JSON.stringify(response.responseBody.cartReference))
      localStorage.setItem('Afro_Cart', JSON.stringify(response.responseBody))
      localStorage.setItem('Afro_Item_No', JSON.stringify(response.responseBody.numberOfItems))
      localStorage.setItem('Afro_Cart_Orders', JSON.stringify(response.responseBody.orders))
      if(res.status === 200) {
        params.toast.success('Cart created and item added successfully', {
          duration: 1000,
        })
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted cart res: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    params.toast.error("Couldn't create or add product to cart")
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const createCart33 = async (encryptedInfo: string) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  };

  try{
    const response = await apiPost(process.env.REACT_APP_AFROMARKETS_URL + "/cart/createCart", encryptedInfo, headers);
    return response;
  }catch(error: any){
    return error.response;
  }
};

export const createCart01 = async (params: FCreateCartProps) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  try{
  params.setLoading(true)
  const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/cart/createCart", params.encryptedInfo, {headers});
  if (response.data) {
    const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
    const responseBody = JSON.parse(decryptedData!);
    
    params.setCount(1);
    saveCartData(responseBody);

    if (response.status === 200) {
      params.toast.success('Cart created and item added successfully', {
        duration: 1000,
      });
    }
  }

}catch (error) {
  console.error('Error creating cart: ', error);
  params.toast.error("Couldn't create or add product to cart");
} finally {
  params.setLoading(false);
}
}

export const addToCart = (params: FCreateCartProps) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  params.setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/cart/addItemToCart", params.encryptedInfo, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      params.setCount(1)
      localStorage.setItem('Afro_Item_No', JSON.stringify(response.responseBody.numberOfItems))
      localStorage.setItem('Afro_Cart_Orders', JSON.stringify(response.responseBody.orders))
      localStorage.setItem('Afro_Cart_AddRes', JSON.stringify(response.responseBody))
      if(res.status === 200) {
        params.toast.success('Product added to cart successfully', {
          duration: 1000,
        })
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted cart res: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    params.toast.error("Couldn't add product to cart")
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const addToCart01 = async (params: FCreateCartProps) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
    'Content-Type': 'text/plain'
  };

  try {
    params.setLoading(true);
    const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/cart/addItemToCart", params.encryptedInfo, { headers });

    if (response.data) {
      const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
      const responseBody = JSON.parse(decryptedData!);

      params.setCount(1);
      saveCartData(responseBody);

      if (response.status === 200) {
        params.toast.success('Product added to cart successfully', {
          duration: 1000,
        });
      }
    }
  } catch (error) {
    console.error('Error adding product to cart: ', error);
    params.toast.error("Couldn't add product to cart");
  } finally {
    params.setLoading(false);
  }
};

export const addToCart33 = async (encryptedInfo: string) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  };

  try{
    const response = await apiPost(process.env.REACT_APP_AFROMARKETS_URL + "/cart/addItemToCart", encryptedInfo, headers );
    return response;
  }catch(error: any){
    return error.response;
  }
};

export const removeFromCart = (params: FRemoveFromCartProps) => {
  const headers = {
    'auth_param':process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  params.setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/cart/removeItemFromCart", params.encryptedInfo, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      localStorage.setItem('Afro_Cart_Orders', JSON.stringify(response.responseBody.orders))
      localStorage.setItem('Afro_Cart', JSON.stringify(response.responseBody.orders[0]))
      localStorage.setItem('Afro_Item_No', JSON.stringify(response.responseBody.numberOfItems))
      if(res.status === 200) {
        params.toast.success('Product removed successfully', {
          duration: 1000
        })
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted cart res: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    params.toast.error("Couldn't remove product from cart")
  }).finally(()=>{
    params.setLoading(false)
  })
}


export const getAllOrders = async (data:string) => {
  const {setOrders} = useUserOrders.getState()
  try {
    const headers = {
      'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
      'Content-Type': 'text/plain'
    };

    const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/cart/fetchUserCart", data, { headers });

    if (response.data) {
      const myData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
      const parsedData = JSON.parse(myData!);
      setOrders(parsedData.responseBody)
      return parsedData.responseBody;
    }
  } catch (error: any) {
    console.log('Error:', await decryptAES(error.response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY));
    throw new Error('Error fetching products');
  }
};

export const getImageUrl = (params: FGetImageProps)=>{
  params.setLoading(true)
  axios
  .post("https://api.cloudinary.com/v1_1/dws9ykgky/image/upload", params.files)
  .then((response)=> {
    const postUrl = response.data.url
    params.setImgUrl(postUrl)
  }).catch((err) => {
    console.log('fetch-img-err: ', err)
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const createNewProduct = (params: FCreateProductProps) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  params.setLoading(true)
  axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/product/listProduct", params.encryptedInfo, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      if(res.status === 200) {
        params.toast.success('Product created successfully', {
          duration: 1000,
        })
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted cart res: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    params.toast.error("Couldn't add product to cart")
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const editProduct = async (params: FCreateProductProps) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  try{
  params.setLoading(true)
  const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/product/editProduct", params.encryptedInfo, {headers}
    )

    if (response.data) {
      const decryptedData = await decryptAES(response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
      const responseBody = JSON.parse(decryptedData!);


      if (response.status === 200) {
        params.toast.success('Product updated successfully', {
          duration: 1000,
        });
      }
    }

  } catch (error: any) {
    const myErr = await decryptAES(error.response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
    console.error('Error adding product to cart: ', myErr);
    params.toast.error("Couldn't add product to cart");
  } finally {
    params.setLoading(false);
  }

}

export const deleteProduct = async (id: string) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  try{
  const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/product/deleteProduct", id, {headers}
    )
    return response


  } catch (error: any) {
    const myErr = await decryptAES(error.response.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
    console.error('Error in deleting product: ', myErr);
  }

}

export const getCategories = (setCategories: React.Dispatch<React.SetStateAction<CategoryProps[]>>) => {
  axios.get(process.env.REACT_APP_AFROMARKETS_URL + "/app/categories")
            .then((res) => {
              // console.log('cat log:', res)
              if(res.data){
                const myData = decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY).then((myres) => {
                  const response = JSON.parse(myres!)
                  setCategories(response)
                  return response
                  
                }).catch((err) => {console.log('real err: ', err)})
                console.log('Decrpyted cart res: ', myData)
                }
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
}

export const handleCheckout = (params: FCheckoutProps) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  };

  params.setLoading(true);

  return axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/order/checkout", params.data, { headers })
    .then((res) => {
      if (res.data) {
        return decryptAES(res.data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
          .then((myres) => {
            const response = JSON.parse(myres!);
            const checkoutUrl = response.responseBody.stripeResponse;
      
            if (res.status === 200) {
              params.toast.success('Checkout successful', {
                duration: 1000
              });
              setTimeout(() => {
                window.location.href = checkoutUrl;
              }, 1000);
            }
          })
          .catch((err) => {
            console.log('real err: ', err);
            throw err; 
          });
      }
    })
    .catch((err) => {
      console.log('user-form-err: ', err);
      params.toast.error("Checkout unsuccessful");
      throw err;
    })
    .finally(() => {
      params.setLoading(false);
    });
};

export const addReview = async (input: FAddReviewProps)=>{
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  };

  const response = await axios.post(process.env.REACT_APP_AFROMARKETS_URL + "/reviews/addReview", input, { headers })

  if(response){
    return response
  }

}

export const updateUserCart = async (encryptedInfo: string) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  };

  try{
    const response = await apiPost(process.env.REACT_APP_AFROMARKETS_URL + "/cart/assignCartToUser", encryptedInfo, headers);
    return response;
  }catch(error: any){
    return error.response;
  }
};



