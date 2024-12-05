import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { UserContext } from "./UserContext";

let WishlistContext = createContext();

function WishlistContextProvider({children}) {
    const [wishlist, setWishlist] = useState([]);
    const{user} =useContext(UserContext);

    // Load wishlist from localStorage when the component mounts
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist);
    }, []);

    // Function to add item to wishlist
    async function addtowishlist(item) {
        try {
            // Send a request to the backend to add the item to the database
            const response = await axios.post('http://localhost:8000/wishlist/create', {
                userId:user._id,
                productname: item.name,
                productimage: item.image,
                productdisplay: item.display,
                productprice: item.price,
                productspeciallity: item.speciallity,
                productbatterybackup: item.batterybackup,
                productstorage: item.storage,
                productcamera: item.camera,
                productprocessor: item.processor,
                productusage: item.usage,
            });

            // If the item was added successfully, update the wishlist state
            if (response.status === 200) {
                const updatedWishlist = [...wishlist, item]; // Add item to the local wishlist state
                setWishlist(updatedWishlist);

                // Store the updated wishlist in localStorage
                localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            }
        } catch (error) {
            console.error('Error adding item to wishlist:', error);
        }
    }

    // Function to remove item from wishlist
    async function removeFromWishlist(itemId) {
        try {
            // Optionally, you could also delete the item from the backend (if your API supports it)
            // const response = await axios.delete(`http://localhost:8000/wishlist/remove/${itemId}`);

            const updatedWishlist = wishlist.filter(item => item.id !== itemId);
            setWishlist(updatedWishlist);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        } catch (error) {
            console.error('Error removing item from wishlist:', error);
        }
    }

    return (
        <WishlistContext.Provider value={{ wishlist, addtowishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export { WishlistContext, WishlistContextProvider };
