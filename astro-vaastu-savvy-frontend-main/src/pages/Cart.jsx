import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBF7] px-4">
        <div className="text-6xl mb-6">🛍️</div>
        <h2 className="text-3xl font-bold text-[#5D101D] mb-4">Your sacred cart is empty</h2>
        <p className="text-gray-500 mb-8 italic">It seems you haven't found your divine match yet.</p>
        <button 
          onClick={() => navigate("/shop")}
          className="px-8 py-3 bg-[#5D101D] text-white rounded-full font-semibold shadow-lg hover:bg-[#3D0A13] transition-all"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#FFFBF7] text-[#4A3728] pb-32 selection:bg-[#5D101D] selection:text-white">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFD700]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#5D101D]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-16">
        <header className="text-center mb-16 space-y-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#B27D62] font-bold">Your Selection</span>
          <h1 className="text-5xl font-bold text-[#5D101D] italic font-['Noto_Serif_Devanagari']">Shopping Cart</h1>
          <div className="w-24 h-px bg-[#E6BE8A] mx-auto pt-4" />
        </header>

        <div className="space-y-6">
          {cartItems.map((item) => {
            const itemId = item._id || item.id;
            return (
              <div
                key={itemId}
                className="group relative flex flex-col md:flex-row justify-between items-center bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row items-center gap-6 w-full">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-[#D4AF37] to-[#E6BE8A] rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                    <img
                      src={item.images?.[0] || "/placeholder.jpg"}
                      alt={item.name}
                      className="relative w-28 h-28 rounded-2xl object-cover shadow-sm"
                    />
                  </div>

                  <div className="text-center md:text-left flex-1">
                    <h2 className="text-xl font-bold text-[#5D101D]">{item.name}</h2>
                    <p className="text-sm text-[#B27D62] italic mb-4">{item.category || "Divine Tool"}</p>
                    
                    {/* QUANTITY CONTROLS */}
                    <div className="inline-flex items-center gap-4 bg-white/80 rounded-full px-4 py-1.5 border border-[#E6BE8A]/30 shadow-inner">
                      <button
                        className="w-8 h-8 flex items-center justify-center text-[#5D101D] hover:bg-[#5D101D] hover:text-white rounded-full transition-colors font-bold disabled:opacity-30"
                        onClick={() => updateQuantity(itemId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      > – </button>
                      <span className="w-6 text-center font-bold text-lg">{item.quantity}</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center text-[#5D101D] hover:bg-[#5D101D] hover:text-white rounded-full transition-colors font-bold"
                        onClick={() => updateQuantity(itemId, item.quantity + 1)}
                      > + </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 md:mt-0 text-right w-full md:w-auto flex md:flex-col justify-between items-center md:items-end">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Subtotal</p>
                    <div className="font-bold text-2xl text-[#8B0000]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(itemId)}
                    className="text-xs font-bold text-red-400 hover:text-red-600 uppercase tracking-tighter mt-4 transition-colors"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* SUMMARY SECTION */}
        <div className="mt-12 p-8 bg-[#5D101D] rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-6">
              <span className="text-lg font-light italic">Order Value</span>
              <span className="text-2xl font-bold">₹{cartTotal.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-[#E6BE8A] font-bold tracking-widest uppercase">Grand Total</p>
                <p className="text-xs opacity-60 mt-1 italic">Inc. of all divine blessings & taxes</p>
              </div>
              <div className="text-4xl font-bold">₹{cartTotal.toLocaleString()}</div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="group relative w-full py-5 rounded-full bg-white text-[#5D101D] text-xl font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              Proceed to Secure Checkout
            </button>
            
            <p className="text-center text-[10px] uppercase tracking-[0.2em] opacity-50">
              🔒 SSL Encrypted & Secure Payment
            </p>
          </div>
        </div>

        <button 
          onClick={() => navigate("/shop")}
          className="mt-8 w-full text-center text-[#B27D62] text-sm font-bold uppercase tracking-widest hover:text-[#5D101D] transition-colors"
        >
          ← Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default Cart;