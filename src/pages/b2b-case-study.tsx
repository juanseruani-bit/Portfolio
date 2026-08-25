import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { GradientDivider, GlowOrb } from "@/components/decorative-elements"
import {
  ArrowLeft, Search, Target, Users, Map, Workflow, Smartphone,
  Bell, ChevronLeft, Menu, ShoppingCart, List, Truck, AlertCircle, FileText, User, 
  Home as HomeIcon, MessageCircle, Star, Plus, Minus, ChevronRight, Package, Info, MoreVertical, Camera
} from "lucide-react"

/* ─── animation helpers ─── */
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

/* ─── data ─── */
const personas = [
  {
    name: "Juan Carlos",
    image: "/images/b2b-case-study/juan-carlos.png",
    age: 41,
    location: "Barcelona, Catalunya, Spain",
    role: "Supermarket buyer",
    status: "Living with his wife & 2 children",
    quote: "I really enjoy my job, negotiate and talk with people is the best!",
    bio: "Juan Carlos is an Accountant, he has been working as buyer for 8 years. He really enjoys his job and does it always with a smile. After work he comes home to spend time with his family.",
    needs: [
      "Don't lose contact with his suppliers.",
      "Stay on his position until his retirement."
    ],
    frustrations: [
      "Dont's spend too many time with his family because of work.",
      "Long walks over Mercabarna to do his job."
    ],
    tech: [
      { name: "Internet", value: 4 },
      { name: "Social Media", value: 4 },
      { name: "Online Shopping", value: 2 },
      { name: "Gadgets", value: 2 },
      { name: "Early adopter", value: 2 },
    ]
  },
  {
    name: "Martin cuevas",
    image: "/images/b2b-case-study/martin-cuevas.png",
    age: 25,
    location: "Madrid, Alcobendas, Spain",
    role: "Supermarket buyer",
    status: "Living with his mother",
    quote: "Everyday is a new challenge, I'll do my best to grow on my career",
    bio: "Martin has a Degree on Business Administration. He works as buyer for a supermarket with a strong presence throughout Spain. After work he likes relaxing and going out with his friends.",
    needs: [
      "Being efficient on his job.",
      "Apply technology that would help him on his job."
    ],
    frustrations: [
      "He feels that He wastes time the way he works.",
      "He easily loses the papers where He makes notations."
    ],
    tech: [
      { name: "Internet", value: 5 },
      { name: "Social Media", value: 4 },
      { name: "Online Shopping", value: 4 },
      { name: "Gadgets", value: 4 },
      { name: "Early adopter", value: 5 },
    ]
  }
]

const journeyMap = [
  {
    stage: "Awareness",
    color: "bg-sky-400",
    touchpoints: ["Check product Stock", "Make a list", "Plan purchases"],
    emotion: "😉"
  },
  {
    stage: "Negotiate",
    color: "bg-sky-400",
    touchpoints: ["Visit vendors", "Negotiate prices", "Take notes on paper", "See available products", "Compare all offers", "Stablish relationship with vendor"],
    emotion: "😃"
  },
  {
    stage: "Purchase",
    color: "bg-sky-400",
    touchpoints: ["Come back with vendors", "Take de correct decision", "Write purchase information on paper", "Choose the best offer"],
    emotion: "😊"
  },
  {
    stage: "Check order",
    color: "bg-sky-400",
    touchpoints: ["Check agreed price and quantity", "Contact vendor if something wrong", "Warehouse manager has to wait until order comes, without information (Negative point)", "Check product's quality"],
    emotion: "😲"
  },
  {
    stage: "Transfer data",
    color: "bg-sky-400",
    touchpoints: ["Rewrite info from paper to PC", "Collect the necessary papers", "Update Stock", "Check for correct input"],
    emotion: "😖"
  }
]

const FlowNode = ({ type, x, y, width = 120, height = 60, label, border = "border-border/80", bg = "bg-card text-foreground" }: any) => {
  if (type === 'rect') {
    return (
      <foreignObject x={x} y={y} width={width} height={height}>
        <div className={`w-full h-full border-2 ${border} ${bg} rounded-md flex items-center justify-center text-center p-2 text-xs shadow-sm`}>
          {label}
        </div>
      </foreignObject>
    )
  }
  if (type === 'oval') {
    return (
      <foreignObject x={x} y={y} width={width} height={height}>
        <div className={`w-full h-full border-2 ${border} ${bg} rounded-[30px] flex items-center justify-center text-center p-2 text-xs shadow-sm`}>
          {label}
        </div>
      </foreignObject>
    )
  }
  if (type === 'diamond') {
    return (
      <foreignObject x={x} y={y} width={width} height={height}>
        <div className="relative w-full h-full flex items-center justify-center">
           <div className={`absolute w-[70%] h-[70%] border-2 ${border} ${bg} rotate-45 shadow-sm rounded-sm`} />
           <div className="relative z-10 text-[10px] text-center p-1 font-medium">{label}</div>
        </div>
      </foreignObject>
    )
  }
  return null;
}

/* ─── UI Components for Visual Design ─── */
const DeviceFrame = ({ children, title }: { children: React.ReactNode, title?: string }) => (
  <div className="flex flex-col items-center gap-4">
    {title && <h4 className="text-xl font-bold text-foreground text-center">{title}</h4>}
    <div className="w-[320px] h-[640px] bg-background border-[8px] border-zinc-800 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col ring-1 ring-white/10">
      {/* Notch / Status bar area */}
      <div className="h-6 w-full bg-transparent flex items-center justify-between px-6 text-[10px] font-medium text-muted-foreground absolute top-0 z-50 pointer-events-none">
        <span>09:41</span>
        <div className="flex gap-1 items-center">
           <span className="w-3 h-3 rounded-full bg-zinc-800 flex items-center justify-center">
             <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
           </span>
        </div>
      </div>
      <div className="flex-1 mt-6 overflow-y-auto bg-slate-50 dark:bg-zinc-950 flex flex-col relative hide-scrollbar">
        {children}
      </div>
    </div>
  </div>
)

const BottomNav = ({ active = 'suppliers' }) => (
  <div className="h-16 bg-white dark:bg-zinc-900 border-t flex items-center justify-around px-2 pb-2 pt-2 shrink-0 z-40 relative shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.05)]">
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active === 'warehouse' ? 'text-teal-600' : 'text-muted-foreground hover:text-foreground'}`}>
      <HomeIcon size={20} />
      <span className="text-[10px]">Warehouse</span>
    </div>
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active === 'suppliers' ? 'text-teal-600' : 'text-muted-foreground hover:text-foreground'}`}>
      <Users size={20} />
      <span className="text-[10px]">My Suppliers</span>
    </div>
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active === 'orders' ? 'text-teal-600' : 'text-muted-foreground hover:text-foreground'}`}>
      <FileText size={20} />
      <span className="text-[10px]">My Orders</span>
    </div>
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active === 'chats' ? 'text-teal-600' : 'text-muted-foreground hover:text-foreground'}`}>
      <MessageCircle size={20} />
      <span className="text-[10px]">Chats</span>
    </div>
  </div>
)

const ScreenSuppliers = () => (
  <DeviceFrame title="My Suppliers">
    <div className="bg-teal-600 px-4 pt-4 pb-6 shadow-sm rounded-b-2xl mb-2 relative z-10 shrink-0">
      <div className="flex justify-between items-center text-white mb-4">
        <Menu size={24} className="cursor-pointer" />
        <span className="font-semibold text-lg">My Suppliers</span>
        <Bell size={24} className="cursor-pointer" />
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
        <input type="text" placeholder="Search by supplier name" className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border-0 focus:ring-2 focus:ring-teal-400 bg-white dark:bg-zinc-800 text-foreground" />
      </div>
    </div>
    
    <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-3">
       {/* Card 1 */}
       <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm flex gap-4 items-center cursor-pointer border border-transparent hover:border-teal-500/30 transition-all">
         <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center shrink-0 overflow-hidden border border-red-200 dark:border-red-900">
            <span className="text-red-500 font-bold text-xl">M</span>
         </div>
         <div className="flex-1">
            <div className="flex justify-between items-start">
               <h5 className="font-semibold text-sm">Mark Vegetables</h5>
               <span className="text-[9px] font-medium text-muted-foreground bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">Local N° 458</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+34 587 587 587</p>
         </div>
       </div>
       {/* Card 2 */}
       <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm flex gap-4 items-center cursor-pointer border border-transparent hover:border-teal-500/30 transition-all">
         <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center shrink-0 overflow-hidden border border-green-200 dark:border-green-900">
            <span className="text-green-500 font-bold text-xl">A</span>
         </div>
         <div className="flex-1">
            <div className="flex justify-between items-start">
               <h5 className="font-semibold text-sm">Alquema Fruits</h5>
               <span className="text-[9px] font-medium text-muted-foreground bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">Local N° 354</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+34 555 444 777</p>
         </div>
       </div>
       {/* Card 3 */}
       <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm flex gap-4 items-center cursor-pointer border border-transparent hover:border-teal-500/30 transition-all">
         <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0 overflow-hidden border border-blue-200 dark:border-blue-900">
            <span className="text-blue-500 font-bold text-xl">G</span>
         </div>
         <div className="flex-1">
            <div className="flex justify-between items-start">
               <h5 className="font-semibold text-sm">Green Thyme</h5>
               <span className="text-[9px] font-medium text-muted-foreground bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">Local N° 302</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+34 123 456 789</p>
         </div>
       </div>
    </div>
    
    <BottomNav active="suppliers" />
  </DeviceFrame>
)

const ScreenControlPanel = () => (
  <DeviceFrame title="Control Panel">
    <div className="bg-teal-600 px-4 pt-4 pb-4 shadow-sm flex justify-between items-center text-white shrink-0">
      <ChevronLeft size={24} className="cursor-pointer" />
      <span className="font-semibold">Mark Vegetables</span>
      <MoreVertical size={24} className="cursor-pointer" />
    </div>
    
    <div className="flex-1 overflow-y-auto p-5 grid grid-cols-2 gap-4 auto-rows-max items-start bg-slate-50 dark:bg-zinc-950">
       <div className="bg-white dark:bg-zinc-900 aspect-square rounded-2xl shadow-sm flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition-all group border border-transparent hover:border-teal-500/30">
          <div className="w-14 h-14 rounded-full bg-teal-50 dark:bg-teal-950 flex items-center justify-center group-hover:scale-110 transition-transform">
             <ShoppingCart className="text-teal-600" size={24} />
          </div>
          <span className="text-xs font-medium">New Order</span>
       </div>
       <div className="bg-white dark:bg-zinc-900 aspect-square rounded-2xl shadow-sm flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition-all group border border-transparent hover:border-teal-500/30">
          <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center group-hover:scale-110 transition-transform">
             <List className="text-blue-600" size={24} />
          </div>
          <span className="text-xs font-medium">Order List</span>
       </div>
       <div className="bg-white dark:bg-zinc-900 aspect-square rounded-2xl shadow-sm flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition-all group border border-transparent hover:border-teal-500/30">
          <div className="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-950 flex items-center justify-center group-hover:scale-110 transition-transform">
             <Truck className="text-amber-600" size={24} />
          </div>
          <span className="text-xs font-medium">Dispatch</span>
       </div>
       <div className="bg-white dark:bg-zinc-900 aspect-square rounded-2xl shadow-sm flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition-all group border border-transparent hover:border-teal-500/30">
          <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center group-hover:scale-110 transition-transform">
             <AlertCircle className="text-red-600" size={24} />
          </div>
          <span className="text-xs font-medium">Order Issues</span>
       </div>
       <div className="bg-white dark:bg-zinc-900 aspect-square rounded-2xl shadow-sm flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition-all group border border-transparent hover:border-teal-500/30">
          <div className="w-14 h-14 rounded-full bg-purple-50 dark:bg-purple-950 flex items-center justify-center group-hover:scale-110 transition-transform">
             <FileText className="text-purple-600" size={24} />
          </div>
          <span className="text-xs font-medium">Documents</span>
       </div>
       <div className="bg-white dark:bg-zinc-900 aspect-square rounded-2xl shadow-sm flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition-all group border border-transparent hover:border-teal-500/30">
          <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
             <User className="text-slate-600" size={24} />
          </div>
          <span className="text-xs font-medium">Details</span>
       </div>
    </div>
    
    <BottomNav active="suppliers" />
  </DeviceFrame>
)

const ScreenItemsSearch = () => (
  <DeviceFrame title="Items Search">
    <div className="bg-teal-600 px-4 pt-4 pb-6 shadow-sm rounded-b-2xl relative z-10 shrink-0">
      <div className="flex justify-between items-center text-white mb-4">
        <ChevronLeft size={24} className="cursor-pointer" />
        <span className="font-semibold text-lg">Items Search</span>
        <Search size={24} className="cursor-pointer" />
      </div>
      <div className="flex gap-4 text-[11px] font-medium text-white/70 overflow-x-auto hide-scrollbar">
         <span className="text-white border-b-2 border-white pb-1 whitespace-nowrap cursor-pointer">All (150+)</span>
         <span className="whitespace-nowrap cursor-pointer hover:text-white">Recents (25)</span>
         <span className="whitespace-nowrap cursor-pointer hover:text-white">Favourites (18)</span>
      </div>
    </div>
    
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
       {/* Product 1 */}
       <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm overflow-hidden flex flex-col border border-transparent hover:border-teal-500/30 cursor-pointer">
          <div className="flex gap-3 p-3">
             <div className="w-20 h-20 bg-red-100 dark:bg-red-950 rounded-xl shrink-0 border border-red-200 dark:border-red-900 relative">
                <div className="absolute inset-0 bg-red-500 opacity-10" />
                <Package className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500" size={24} />
             </div>
             <div className="flex-1 flex flex-col justify-between">
                <div>
                   <div className="flex justify-between">
                      <h5 className="font-semibold text-sm leading-tight text-foreground">Red Beefsteak Tomato</h5>
                      <Star size={16} className="text-muted-foreground shrink-0 ml-2" />
                   </div>
                   <span className="text-[10px] text-muted-foreground mt-0.5 block">SKU: #R7450-T202</span>
                </div>
                <div className="flex justify-between items-end mt-2">
                   <div className="text-[9px] text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:border dark:border-amber-900/50 px-2 py-0.5 rounded-full font-medium">In Stock 500/1200kg</div>
                   <div className="bg-teal-600 text-white p-1.5 rounded-full shadow-md hover:scale-110 transition-transform"><Plus size={14}/></div>
                </div>
             </div>
          </div>
       </div>
       
       {/* Product 2 */}
       <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm overflow-hidden flex flex-col border border-transparent hover:border-teal-500/30 cursor-pointer">
          <div className="flex gap-3 p-3">
             <div className="w-20 h-20 bg-green-100 dark:bg-green-950 rounded-xl shrink-0 border border-green-200 dark:border-green-900 relative">
                <div className="absolute inset-0 bg-green-500 opacity-10" />
                <Package className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500" size={24} />
             </div>
             <div className="flex-1 flex flex-col justify-between">
                <div>
                   <div className="flex justify-between">
                      <h5 className="font-semibold text-sm leading-tight text-foreground">Iceberg Lettuce</h5>
                      <Star size={16} className="text-amber-400 fill-amber-400 shrink-0 ml-2" />
                   </div>
                   <span className="text-[10px] text-muted-foreground mt-0.5 block">SKU: #L222-L7545</span>
                </div>
                <div className="flex justify-between items-end mt-2">
                   <div className="text-[9px] text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:border dark:border-amber-900/50 px-2 py-0.5 rounded-full font-medium">In Stock 100/900kg</div>
                   <div className="bg-teal-600 text-white p-1.5 rounded-full shadow-md hover:scale-110 transition-transform"><Plus size={14}/></div>
                </div>
             </div>
          </div>
       </div>
    </div>
    
    <BottomNav active="suppliers" />
  </DeviceFrame>
)

const ScreenProductDetail = () => (
  <DeviceFrame title="Product Detail">
    <div className="h-[240px] w-full bg-red-100 dark:bg-red-950 relative shrink-0">
       <div className="absolute top-4 left-4 z-20 w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer shadow-sm">
         <ChevronLeft size={20} />
       </div>
       <div className="absolute inset-0 bg-red-600/20 dark:bg-red-900/40 flex items-center justify-center">
         <Package size={64} className="text-red-500/50" />
       </div>
       <div className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-sm cursor-pointer">
         <MoreVertical size={20} />
       </div>
    </div>
    
    <div className="flex-1 bg-white dark:bg-zinc-950 -mt-6 rounded-t-3xl relative z-10 p-5 flex flex-col gap-5 overflow-y-auto shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
       <div className="flex justify-between items-start">
          <div>
             <h3 className="text-lg font-bold leading-tight text-foreground">Red Beefsteak Tomato</h3>
             <span className="text-[11px] text-muted-foreground block mt-1">SKU: #R7450-T202</span>
          </div>
          <div className="text-[10px] text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:border dark:border-amber-900/50 px-2 py-1 rounded-full font-medium whitespace-nowrap ml-2">Stock: 500/1200kg</div>
       </div>
       
       <div className="bg-slate-50 dark:bg-zinc-900 rounded-xl p-3 flex justify-between items-center cursor-pointer border border-transparent hover:border-teal-500/30">
          <span className="text-xs font-semibold flex items-center gap-2"><Info size={16} className="text-teal-600"/> Product Information</span>
          <ChevronRight size={16} className="text-muted-foreground" />
       </div>
       
       <div className="space-y-4">
          <div className="flex justify-between items-center">
             <span className="text-sm font-medium">Select Quantity</span>
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center cursor-pointer hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"><Minus size={14}/></div>
                <span className="font-semibold w-6 text-center">30</span>
                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 flex items-center justify-center cursor-pointer hover:bg-teal-200 dark:hover:bg-teal-900 transition-colors"><Plus size={14}/></div>
             </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
             <div className="border rounded-xl p-2 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-teal-500/50 dark:hover:bg-zinc-900 transition-all">
                <span className="text-xs text-muted-foreground">Unit</span>
             </div>
             <div className="border rounded-xl p-2 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-teal-500/50 dark:hover:bg-zinc-900 transition-all">
                <span className="text-xs text-muted-foreground">Kg</span>
             </div>
             <div className="border-2 border-teal-500 bg-teal-50 dark:bg-teal-950/30 rounded-xl p-2 flex flex-col items-center justify-center gap-1 cursor-pointer text-teal-700 dark:text-teal-400">
                <Package size={18} />
                <span className="text-[10px] font-bold">Box</span>
             </div>
          </div>
       </div>
       
       <div className="space-y-3 pt-3 border-t">
          <div className="flex justify-between text-sm items-center">
             <span className="text-muted-foreground">Agreed Price</span>
             <span className="font-semibold">2.58 €/kg</span>
          </div>
          <div className="flex justify-between text-sm items-center">
             <span className="text-muted-foreground">Item Load</span>
             <span className="font-semibold text-right">30 Boxes <br/><span className="text-[10px] text-muted-foreground font-normal">180 Kgs / 0.15 Pallets</span></span>
          </div>
       </div>
       
       <div className="mt-auto pt-4 border-t flex justify-between items-center pb-2">
          <div className="flex flex-col">
             <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Total</span>
             <span className="text-xl font-bold text-teal-600">464.40 €</span>
          </div>
          <button className="bg-teal-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-teal-600/30 hover:bg-teal-700 transition-all hover:scale-105 active:scale-95">
             Add to Order
          </button>
       </div>
    </div>
  </DeviceFrame>
)

const ScreenOrderSummary = () => (
  <DeviceFrame title="Order Summary">
    <div className="bg-teal-600 px-4 pt-4 pb-4 shadow-sm flex justify-between items-center text-white shrink-0">
      <ChevronLeft size={24} className="cursor-pointer" />
      <span className="font-semibold text-sm">Order #21364-4326</span>
      <MoreVertical size={24} className="cursor-pointer" />
    </div>
    
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50 dark:bg-zinc-950">
       <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-transparent hover:border-border transition-colors">
          <div className="flex justify-between items-center mb-3">
             <span className="text-[13px] font-bold flex items-center gap-2"><List size={16} className="text-teal-600"/> Order Information</span>
          </div>
          <div className="text-[11px] space-y-1 mb-4 text-muted-foreground border-b pb-3 border-dashed">
             <p><span className="font-medium text-foreground">Created:</span> Monday, 03 10:50</p>
             <p><span className="font-medium text-foreground">Supplier:</span> Mark Vegetables</p>
          </div>
          
          <div className="space-y-2 mb-3 text-[11px] font-medium">
             <div className="flex justify-between items-center">
                <span className="flex-1 text-muted-foreground">30 boxes Red Beefsteak...</span>
                <span>2.58 €</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="flex-1 text-muted-foreground">150 boxes Iceberg...</span>
                <span>2.40 €</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="flex-1 text-muted-foreground">5 Kgs Bananas Canarias</span>
                <span>3.00 €</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="flex-1 text-muted-foreground">1 pallet Yellow Onions</span>
                <span>0.97 €</span>
             </div>
          </div>
          <div className="flex justify-between items-center font-bold text-sm text-teal-600 pt-2 border-t border-dashed">
             <span>Total Amount:</span>
             <span>758.22 €</span>
          </div>
       </div>
       
       <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-transparent hover:border-border transition-colors">
          <div className="flex justify-between items-center mb-3">
             <span className="text-[13px] font-bold flex items-center gap-2"><Truck size={16} className="text-teal-600"/> Shipping Info</span>
          </div>
          <div className="text-[11px] space-y-1.5 text-muted-foreground">
             <p>D. Carrer K Zona Franca, 37, 39, 08040 Barcelona</p>
             <p className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block"/> 12:00 - 13:00hs</p>
          </div>
          <div className="mt-3 text-right">
             <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wide cursor-pointer hover:underline">Edit Shipping</span>
          </div>
       </div>
       
       <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-transparent hover:border-border transition-colors flex justify-between items-center cursor-pointer">
          <span className="text-[13px] font-bold flex items-center gap-2"><MessageCircle size={16} className="text-teal-600"/> Comments</span>
          <ChevronRight size={16} className="text-muted-foreground" />
       </div>
    </div>
    
    <div className="p-4 bg-white dark:bg-zinc-900 border-t shrink-0 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] relative z-20">
       <button className="w-full bg-teal-600 text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-teal-600/30 hover:bg-teal-700 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
          <Package size={16} /> CONFIRM PURCHASE
       </button>
       <button className="w-full bg-transparent text-teal-600 border border-teal-600/30 py-3 rounded-xl text-sm font-bold mt-2 hover:bg-teal-50 dark:hover:bg-teal-950 transition-colors">
          EDIT ORDER
       </button>
    </div>
  </DeviceFrame>
)

const ScreenClaimForm = ({ state = 'dropdown' }: { state?: 'dropdown' | 'photos' }) => (
  <DeviceFrame title="Claim Form">
    <div className="bg-red-600 px-4 pt-4 pb-4 shadow-sm flex justify-between items-center text-white shrink-0">
      <ChevronLeft size={24} className="cursor-pointer" />
      <span className="font-semibold text-sm">What's Wrong?</span>
      <div className="w-6" /> {/* spacer */}
    </div>
    
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 bg-white dark:bg-zinc-950">
       <div className="space-y-2">
          <label className="text-[11px] font-bold text-center block w-full text-muted-foreground uppercase tracking-wide">Choose an option</label>
          {state === 'dropdown' ? (
             <div className="relative">
                <div className="border border-red-500 rounded-xl p-3.5 flex justify-between items-center text-sm shadow-[0_0_0_3px_rgba(239,68,68,0.15)] bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 font-medium">
                   <span>Broken pallet</span>
                   <ChevronRight size={16} className="rotate-90" />
                </div>
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border rounded-xl shadow-xl z-20 overflow-hidden">
                   <div className="p-3.5 text-sm border-b hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer text-muted-foreground transition-colors">Wrong quantity</div>
                   <div className="p-3.5 text-sm border-b hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer text-muted-foreground transition-colors">Wrong total weight</div>
                   <div className="p-3.5 text-sm bg-red-50 dark:bg-red-900/20 text-red-600 font-semibold cursor-pointer">Broken pallet</div>
                </div>
             </div>
          ) : (
             <div className="border border-border/50 rounded-xl p-3.5 flex justify-between items-center text-sm bg-slate-50 dark:bg-zinc-900 cursor-pointer hover:border-border transition-colors">
                <span className="text-foreground">Broken pallet</span>
                <ChevronRight size={16} className="text-muted-foreground" />
             </div>
          )}
       </div>
       
       <div className="space-y-2 relative z-10 mt-2">
          <label className="text-[11px] font-bold text-center block w-full text-muted-foreground uppercase tracking-wide">Additional comment</label>
          <textarea 
             className="w-full border border-border/50 rounded-xl p-3.5 text-sm min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50 dark:bg-zinc-900 text-foreground transition-all"
             placeholder="Write a comment..."
             defaultValue={state === 'photos' ? "Pallet was broken when we receive the order." : ""}
          />
       </div>
       
       <div className="space-y-3 mt-2">
          <label className="text-[11px] font-bold text-center block w-full text-muted-foreground uppercase tracking-wide">Take some photos</label>
          {state === 'dropdown' ? (
             <div className="w-20 h-20 mx-auto border-2 border-dashed border-red-300 dark:border-red-800/50 rounded-2xl flex items-center justify-center text-red-500 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 cursor-pointer transition-all">
                <Camera size={28} />
             </div>
          ) : (
             <div className="flex gap-3 justify-center">
                <div className="w-[72px] h-[72px] bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden border-2 border-transparent hover:border-red-500 cursor-pointer transition-colors relative group">
                   <div className="w-full h-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center"><Package size={24} className="text-orange-400"/></div>
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"><Camera size={20}/></div>
                </div>
                <div className="w-[72px] h-[72px] bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden border-2 border-transparent hover:border-red-500 cursor-pointer transition-colors relative group">
                   <div className="w-full h-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center"><Package size={24} className="text-amber-500"/></div>
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"><Camera size={20}/></div>
                </div>
                <div className="w-[72px] h-[72px] bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:text-red-500 hover:border-red-500 cursor-pointer transition-colors">
                   <Plus size={24}/>
                </div>
             </div>
          )}
       </div>
    </div>
    
    <div className="p-4 bg-white dark:bg-zinc-900 border-t shrink-0 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] relative z-20">
       <button className="w-full bg-red-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-red-600/30 hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-95">
          SEND REPORT
       </button>
    </div>
  </DeviceFrame>
)

const ScreenWarehouse = () => (
  <DeviceFrame title="Warehouse">
    <div className="bg-teal-600 px-4 pt-4 pb-4 shadow-sm rounded-b-2xl relative z-10 shrink-0">
      <div className="flex justify-between items-center text-white mb-4">
        <Menu size={24} className="cursor-pointer" />
        <span className="font-semibold text-lg">Warehouse</span>
        <div className="w-6"/>
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
        <input type="text" placeholder="Search by product name" className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border-0 focus:ring-2 focus:ring-teal-400 bg-white dark:bg-zinc-800 text-foreground" />
      </div>
      <div className="flex gap-4 text-[11px] font-medium text-white/70 overflow-x-auto hide-scrollbar pb-1">
         <span className="text-white border-b-2 border-white pb-1 whitespace-nowrap cursor-pointer">All (150+)</span>
         <span className="whitespace-nowrap cursor-pointer hover:text-white">Out of Stock (25)</span>
         <span className="whitespace-nowrap cursor-pointer hover:text-white flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"/> Low Stock (18)</span>
      </div>
    </div>
    
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-slate-50 dark:bg-zinc-950">
       {/* Product 1 - Low Stock */}
       <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-4 border border-transparent hover:border-teal-500/30 flex gap-4 cursor-pointer transition-colors relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-500" />
          <div className="w-16 h-16 bg-red-100 dark:bg-red-950 rounded-xl shrink-0 flex items-center justify-center border border-red-200 dark:border-red-900">
             <Package className="text-red-500" size={24}/>
          </div>
          <div className="flex-1 flex flex-col justify-between py-0.5">
             <div>
                <h5 className="font-semibold text-[13px] leading-tight">Red Beefsteak Tomato</h5>
                <span className="text-[9px] text-muted-foreground block mt-0.5">SKU: #R7450-T202</span>
             </div>
             <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold w-16 text-amber-600 dark:text-amber-500">500/1200 Kg</span>
                <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                   <div className="h-full bg-amber-500 w-[45%]" />
                </div>
                <span className="text-[9px] font-bold text-amber-500">45%</span>
             </div>
          </div>
       </div>
       
       {/* Product 2 - Critical Stock */}
       <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-4 border border-transparent hover:border-teal-500/30 flex gap-4 cursor-pointer transition-colors relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-500" />
          <div className="w-16 h-16 bg-green-100 dark:bg-green-950 rounded-xl shrink-0 flex items-center justify-center border border-green-200 dark:border-green-900">
             <Package className="text-green-500" size={24}/>
          </div>
          <div className="flex-1 flex flex-col justify-between py-0.5">
             <div>
                <h5 className="font-semibold text-[13px] leading-tight flex justify-between">
                   Iceberg Lettuce
                   <AlertCircle size={14} className="text-red-500"/>
                </h5>
                <span className="text-[9px] text-muted-foreground block mt-0.5">SKU: #L222-L7545</span>
             </div>
             <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold w-16 text-red-500">100/900 Kg</span>
                <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                   <div className="h-full bg-red-500 w-[15%]" />
                </div>
                <span className="text-[9px] font-bold text-red-500">15%</span>
             </div>
          </div>
       </div>
       
       {/* Product 3 - Good Stock */}
       <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-4 border border-transparent hover:border-teal-500/30 flex gap-4 cursor-pointer transition-colors relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-teal-500" />
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/40 rounded-xl shrink-0 flex items-center justify-center border border-yellow-200 dark:border-yellow-900">
             <Package className="text-yellow-500" size={24}/>
          </div>
          <div className="flex-1 flex flex-col justify-between py-0.5">
             <div>
                <h5 className="font-semibold text-[13px] leading-tight">Bananas from Canarias</h5>
                <span className="text-[9px] text-muted-foreground block mt-0.5">SKU: #BC242-BB301</span>
             </div>
             <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-medium w-16 text-teal-700 dark:text-teal-400">500/500 Kg</span>
                <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                   <div className="h-full bg-teal-500 w-[100%]" />
                </div>
                <span className="text-[9px] font-bold text-teal-600">100%</span>
             </div>
          </div>
       </div>
    </div>
    
    <BottomNav active="warehouse" />
  </DeviceFrame>
)

const ScreenChats = () => (
  <DeviceFrame title="Chats">
    <div className="bg-teal-600 px-4 pt-4 pb-6 shadow-sm rounded-b-2xl relative z-10 shrink-0">
      <div className="flex justify-between items-center text-white mb-4">
        <Menu size={24} className="cursor-pointer" />
        <span className="font-semibold text-lg">Chats</span>
        <div className="w-6"/>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
        <input type="text" placeholder="Search by supplier name" className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border-0 focus:ring-2 focus:ring-teal-400 bg-white dark:bg-zinc-800 text-foreground" />
      </div>
    </div>
    
    <div className="flex-1 overflow-y-auto flex flex-col bg-white dark:bg-zinc-950 pt-2">
       {/* Chat 1 - Unread */}
       <div className="px-4 py-3 flex gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors">
          <div className="w-[52px] h-[52px] rounded-full bg-red-100 shrink-0 border border-red-200 flex items-center justify-center relative">
             <span className="text-red-500 font-bold text-xl">M</span>
             <div className="absolute -bottom-1 -right-1 bg-teal-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-zinc-950 shadow-sm">2</div>
          </div>
          <div className="flex-1 border-b border-border/50 pb-3">
             <div className="flex justify-between items-center">
                <h5 className="font-semibold text-sm">Mark Vegetables</h5>
                <span className="text-[10px] text-teal-600 font-bold">10:50</span>
             </div>
             <div className="flex justify-between items-center mt-0.5">
                <p className="text-xs text-foreground font-medium truncate max-w-[180px]">✓ The order has arrived, thank you!</p>
             </div>
          </div>
       </div>
       
       {/* Chat 2 */}
       <div className="px-4 py-3 flex gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors">
          <div className="w-[52px] h-[52px] rounded-full bg-green-100 shrink-0 border border-green-200 flex items-center justify-center">
             <span className="text-green-500 font-bold text-xl">A</span>
          </div>
          <div className="flex-1 border-b border-border/50 pb-3">
             <div className="flex justify-between items-center">
                <h5 className="font-semibold text-sm">Alquema Fruits</h5>
                <span className="text-[10px] text-muted-foreground">Yesterday</span>
             </div>
             <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[200px]">Thank for you purchase, have a great...</p>
          </div>
       </div>
       
       {/* Chat 3 */}
       <div className="px-4 py-3 flex gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors">
          <div className="w-[52px] h-[52px] rounded-full bg-blue-100 shrink-0 border border-blue-200 flex items-center justify-center">
             <span className="text-blue-500 font-bold text-xl">G</span>
          </div>
          <div className="flex-1 pb-3">
             <div className="flex justify-between items-center">
                <h5 className="font-semibold text-sm">Green Thyme</h5>
                <span className="text-[10px] text-muted-foreground">Tuesday</span>
             </div>
             <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                <span className="text-teal-500 font-bold text-[10px]">✓✓</span> <span className="truncate">I have sent you the order, cheers!</span>
             </div>
          </div>
       </div>
    </div>
    
    <BottomNav active="chats" />
  </DeviceFrame>
)

/* ─── component ─── */
export function B2BCaseStudyPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 relative">
      {/* Decorative orbs */}
      <GlowOrb color="teal" size="lg" className="-top-40 right-0" />
      <GlowOrb color="teal" size="md" className="top-[600px] -left-40" />

      {/* Back */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Link to="/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-8")}>
          <ArrowLeft className="mr-2 h-4 w-4" />Volver
        </Link>
      </motion.div>

      {/* ═══════════════ HERO ═══════════════ */}
      <motion.section className="mb-16" initial="hidden" animate="show" variants={stagger}>
        <motion.div variants={fadeIn} className="flex flex-wrap gap-3 mb-6">
          <Badge className="bg-green-600 hover:bg-green-700 border-0 text-white">B2B App</Badge>
          <Badge variant="outline">UX/UI Design</Badge>
          <Badge variant="outline">Mobile</Badge>
        </motion.div>

        <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-[900px] text-green-500">
          Design Assignment: <br/> B2B App for Buyers
        </motion.h1>

        <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-[700px]">
          Digitalizando y optimizando el proceso de compra de inventario para supermercados y negocios B2B, eliminando el uso del papel y mejorando la eficiencia.
        </motion.p>

        <motion.div variants={fadeIn} className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-10">
          <div><span className="font-semibold text-foreground">Rol:</span> UX/UI Designer</div>
          <div><span className="font-semibold text-foreground">Sector:</span> Food / Wholesale</div>
          <div><span className="font-semibold text-foreground">Plataforma:</span> Mobile App</div>
        </motion.div>

        <motion.div variants={fadeIn} className="h-64 md:h-[450px] w-full rounded-xl overflow-hidden relative border border-green-500/20 flex flex-col items-center justify-center shadow-lg">
             <img src="/images/b2b-cover-clean.png" alt="B2B App Cover" className="absolute inset-0 w-full h-full object-cover object-center z-0" />
             
             {/* Overlay para igualar el tono verdoso original */}
             <div className="absolute inset-0 bg-green-900/30 mix-blend-multiply z-10" />
             <div className="absolute inset-0 bg-black/30 z-10" />
             
             {/* Texto vectorial en código */}
             <div className="relative z-20 text-center px-4">
                <h2 className="text-4xl md:text-6xl font-medium text-white mb-4 drop-shadow-lg tracking-wide">Design Assignment</h2>
                <p className="text-xl md:text-3xl text-white/90 font-light drop-shadow-lg">B2B app for buyers</p>
             </div>
             
             <div className="absolute bottom-4 right-4 md:right-8 z-20 bg-green-900/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-green-500/30">
                <p className="text-white/90 text-sm md:text-base font-medium drop-shadow">Ruani, Juan Sebastian</p>
             </div>
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ UNDERSTAND ═══════════════ */}
      <motion.section className="mb-20 max-w-[800px]" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-6 flex items-center gap-3 text-green-500">
           <Search className="h-8 w-8" />
           Understand
        </motion.h2>
        <motion.div variants={fadeIn} className="space-y-4 text-lg text-muted-foreground leading-relaxed">
          <ul className="space-y-4 list-none">
            <li className="flex gap-3">
               <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-green-500" />
               <p><span className="text-foreground font-medium">How many times are available the buyers to run out of food and run into other providers?</span></p>
            </li>
            <li className="flex gap-3">
               <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-green-500" />
               <p><span className="text-foreground font-medium">Is there any specific "Order day" or if they buy local and running everyday, how many of this businesses exist?</span></p>
            </li>
            <li className="flex gap-3">
               <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-green-500" />
               <p>
                 <span className="text-foreground font-medium">To have a full background I'll do user research from 25-45 and +45 to see:</span>
                 <ul className="list-disc pl-6 mt-2 text-base text-muted-foreground">
                   <li>How interact with phones</li>
                   <li>How run their business and what kind of UX respects the terms needed.</li>
                   <li>How organize order/stock today.</li>
                 </ul>
               </p>
            </li>
          </ul>
        </motion.div>
      </motion.section>

      {/* ═══════════════ PERSONAS ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-10 flex items-center gap-3 text-green-500">
           <Users className="h-8 w-8" />
           User Personas
        </motion.h2>

        <div className="space-y-12">
          {personas.map((persona) => (
             <motion.div key={persona.name} variants={fadeIn}>
                <Card className="overflow-hidden border-border/50">
                   <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-0">
                      {/* Avatar Side */}
                      <div className="bg-muted relative h-[350px] md:h-auto border-b md:border-b-0 md:border-r border-border/50 flex items-center justify-center overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                         {/* Hacemos la imagen un 20% más alta y la alineamos arriba para que el texto original (abajo) quede oculto (overflow-hidden) */}
                         <img src={persona.image} alt={persona.name} className="absolute top-0 left-0 w-full h-[125%] object-cover object-top z-0" />
                         <div className="absolute bottom-6 left-6 right-6 z-20">
                            <p className="text-white text-sm font-medium italic drop-shadow-md">"{persona.quote}"</p>
                         </div>
                      </div>
                      
                      {/* Info Side */}
                      <div className="p-6 md:p-8">
                         <div className="mb-6">
                            <h3 className="text-3xl font-bold mb-2">{persona.name}</h3>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                               <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-green-500"/> {persona.age}</span>
                               <span className="flex items-center gap-1.5"><Map className="w-4 h-4 text-green-500"/> {persona.location}</span>
                               <span className="flex items-center gap-1.5"><Target className="w-4 h-4 text-green-500"/> {persona.role}</span>
                               <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-green-500"/> {persona.status}</span>
                            </div>
                         </div>

                         <div className="mb-6">
                           <h4 className="text-xl font-semibold text-sky-500 mb-2 border-b-2 border-sky-500 inline-block pb-1">Bio</h4>
                           <p className="text-muted-foreground leading-relaxed">{persona.bio}</p>
                         </div>

                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                            <div>
                               <h4 className="text-xl font-semibold text-sky-500 mb-3 border-b-2 border-sky-500 inline-block pb-1">Wants & Needs</h4>
                               <ul className="space-y-2">
                                  {persona.needs.map(n => (
                                     <li key={n} className="flex gap-2 text-muted-foreground text-sm">
                                        <div className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-sky-500" />
                                        <span>{n}</span>
                                     </li>
                                  ))}
                               </ul>
                            </div>
                            <div>
                               <h4 className="text-xl font-semibold text-sky-500 mb-3 border-b-2 border-sky-500 inline-block pb-1">Frustrations</h4>
                               <ul className="space-y-2">
                                  {persona.frustrations.map(f => (
                                     <li key={f} className="flex gap-2 text-muted-foreground text-sm">
                                        <div className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-sky-500" />
                                        <span>{f}</span>
                                     </li>
                                  ))}
                               </ul>
                            </div>
                         </div>

                         <div className="bg-muted/30 rounded-xl p-6">
                            <h4 className="text-xl font-semibold text-sky-500 mb-4 border-b-2 border-sky-500 inline-block pb-1">Tech</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                               {persona.tech.map(t => (
                                  <div key={t.name} className="flex items-center justify-between">
                                     <span className="text-sm">{t.name}</span>
                                     <div className="flex gap-1">
                                        {[1,2,3,4,5].map(v => (
                                           <div key={v} className={`w-2.5 h-2.5 rounded-full ${v <= t.value ? 'bg-sky-500' : 'bg-muted-foreground/30'}`} />
                                        ))}
                                     </div>
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                </Card>
             </motion.div>
          ))}
        </div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ DEFINE ═══════════════ */}
      <motion.section className="mb-20 max-w-[800px]" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-6 flex items-center gap-3 text-green-500">
           <Target className="h-8 w-8" />
           Define
        </motion.h2>
        <motion.div variants={fadeIn} className="space-y-4 text-lg text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground">User need:</p>
          <ul className="space-y-3 list-none pl-4">
            <li className="flex gap-3">
               <div className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-green-500" />
               <span>Create an environment to communicate with suppliers without losing any information in the middle.</span>
            </li>
            <li className="flex gap-3">
               <div className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-green-500" />
               <span>A method to easily integrate order in the actual workflow.</span>
            </li>
            <li className="flex gap-3">
               <div className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-green-500" />
               <span>Easier access to old interactions to make new purchases.</span>
            </li>
            <li className="flex gap-3">
               <div className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-green-500" />
               <span>Digitalize the process... more synced with system for checking the stock (++).</span>
            </li>
          </ul>
        </motion.div>
      </motion.section>

      {/* ═══════════════ JOURNEY & FLOW ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-6 flex items-center gap-3 text-green-500">
           <Map className="h-8 w-8" />
           User Journey
        </motion.h2>
        <motion.div variants={fadeIn} className="mb-16 overflow-x-auto pb-4">
           <div className="min-w-[800px] flex flex-col gap-8">
              {/* Stages Row */}
              <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr] gap-4 items-center">
                 <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-500 font-bold p-4 rounded-lg shadow-sm text-center">Stages</div>
                 {journeyMap.map((col) => (
                    <div key={col.stage} className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50 text-sky-700 dark:text-sky-500 font-bold p-4 rounded-lg shadow-sm text-center">
                       {col.stage}
                    </div>
                 ))}
              </div>

              {/* Touchpoints Row */}
              <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr] gap-4">
                 <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-500 font-bold p-4 rounded-lg shadow-sm flex items-center justify-center text-center h-full">Touchpoints</div>
                 {journeyMap.map((col) => (
                    <div key={col.stage} className="flex flex-col gap-3">
                       {col.touchpoints.map((tp, i) => (
                          <div key={i} className={`text-sm p-3 rounded-lg shadow-sm border font-medium ${tp.includes('wait until') ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400' : 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-500'}`}>
                             {tp}
                          </div>
                       ))}
                    </div>
                 ))}
              </div>

              {/* Emotions Row */}
              <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr] gap-4 items-center mt-4">
                 <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-500 font-bold p-4 rounded-lg shadow-sm text-center">Emotion</div>
                 {journeyMap.map((col) => (
                    <div key={col.stage} className="text-center text-5xl flex justify-center items-center">
                       <span className="inline-block p-4 rounded-full border-4 border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 drop-shadow-sm">{col.emotion}</span>
                    </div>
                 ))}
              </div>
           </div>
        </motion.div>

        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-6 flex items-center gap-3 text-green-500">
           <Workflow className="h-8 w-8" />
           Userflow
        </motion.h2>
        <motion.div variants={fadeIn}>
           <div className="w-full bg-white/5 border border-border/50 rounded-xl overflow-hidden min-h-[400px] p-8">
              <p className="text-muted-foreground mb-6">El diagrama muestra la complejidad del proceso de compra desde la verificación del stock hasta el envío de la factura a administración.</p>
              
              <div className="w-full overflow-x-auto pb-6">
                 <svg viewBox="0 0 1250 620" className="w-full h-auto text-sm font-sans" style={{ minWidth: '900px' }}>
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-muted-foreground" />
                      </marker>
                    </defs>
                    
                    {/* EDGES */}
                    <g stroke="currentColor" className="text-muted-foreground" strokeWidth="1.5" fill="none">
                      {/* Row 1 */}
                      <line x1="140" y1="50" x2="170" y2="50" markerEnd="url(#arrowhead)" />
                      <line x1="290" y1="50" x2="320" y2="50" markerEnd="url(#arrowhead)" />
                      <line x1="440" y1="50" x2="470" y2="50" markerEnd="url(#arrowhead)" />
                      <line x1="590" y1="50" x2="620" y2="50" markerEnd="url(#arrowhead)" />
                      <line x1="740" y1="50" x2="770" y2="50" markerEnd="url(#arrowhead)" />
                      <line x1="890" y1="50" x2="920" y2="50" markerEnd="url(#arrowhead)" />
                      <line x1="1040" y1="50" x2="1080" y2="50" markerEnd="url(#arrowhead)" />
                      
                      {/* Row 2 */}
                      <line x1="100" y1="150" x2="170" y2="150" markerEnd="url(#arrowhead)" />
                      <line x1="290" y1="150" x2="320" y2="150" markerEnd="url(#arrowhead)" />
                      <line x1="440" y1="150" x2="470" y2="150" markerEnd="url(#arrowhead)" />
                      <line x1="590" y1="150" x2="620" y2="150" markerEnd="url(#arrowhead)" />
                      <line x1="740" y1="150" x2="770" y2="150" markerEnd="url(#arrowhead)" />
                      <line x1="890" y1="150" x2="920" y2="150" markerEnd="url(#arrowhead)" />
                      <line x1="1040" y1="150" x2="1080" y2="150" markerEnd="url(#arrowhead)" />

                      {/* Row 3 */}
                      <line x1="100" y1="250" x2="170" y2="250" markerEnd="url(#arrowhead)" />
                      <line x1="290" y1="250" x2="330" y2="250" markerEnd="url(#arrowhead)" />
                      <line x1="430" y1="250" x2="470" y2="250" markerEnd="url(#arrowhead)" />
                      <text x="440" y="240" fill="currentColor" stroke="none" className="text-[11px] font-medium">Yes</text>
                      <line x1="590" y1="250" x2="620" y2="250" markerEnd="url(#arrowhead)" />
                      <line x1="740" y1="250" x2="770" y2="250" markerEnd="url(#arrowhead)" />
                      <line x1="890" y1="250" x2="920" y2="250" markerEnd="url(#arrowhead)" />
                      <line x1="1040" y1="250" x2="1070" y2="250" markerEnd="url(#arrowhead)" />
                      <line x1="1190" y1="250" x2="1230" y2="250" markerEnd="url(#arrowhead)" />

                      {/* Row 3 NO branch */}
                      <polyline points="380,300 380,350 470,350" markerEnd="url(#arrowhead)" />
                      <text x="390" y="340" fill="currentColor" stroke="none" className="text-[11px] font-medium">no</text>
                      <line x1="590" y1="350" x2="620" y2="350" markerEnd="url(#arrowhead)" />
                      <line x1="740" y1="350" x2="770" y2="350" markerEnd="url(#arrowhead)" />
                      
                      {/* Row 3 Loop back */}
                      <polyline points="890,350 920,350 920,390 230,390 230,280" markerEnd="url(#arrowhead)" />

                      {/* Row 4 */}
                      <line x1="100" y1="450" x2="170" y2="450" markerEnd="url(#arrowhead)" />
                      <line x1="270" y1="450" x2="320" y2="450" markerEnd="url(#arrowhead)" />
                      <text x="285" y="440" fill="currentColor" stroke="none" className="text-[11px] font-medium">Yes</text>
                      <line x1="440" y1="450" x2="470" y2="450" markerEnd="url(#arrowhead)" />
                      <line x1="590" y1="450" x2="620" y2="450" markerEnd="url(#arrowhead)" />
                      <line x1="740" y1="450" x2="770" y2="450" markerEnd="url(#arrowhead)" />
                      <line x1="890" y1="450" x2="920" y2="450" markerEnd="url(#arrowhead)" />

                      {/* Row 4 NO branch */}
                      <polyline points="220,500 220,550 320,550" markerEnd="url(#arrowhead)" />
                      <text x="230" y="540" fill="currentColor" stroke="none" className="text-[11px] font-medium">no</text>
                      <line x1="440" y1="550" x2="470" y2="550" markerEnd="url(#arrowhead)" />
                      <line x1="590" y1="550" x2="620" y2="550" markerEnd="url(#arrowhead)" />
                    </g>

                    {/* NODES Row 1 */}
                    <FlowNode type="oval" x={20} y={20} label="Start" border="border-green-500" bg="bg-green-500/10 text-green-500 font-bold" />
                    <FlowNode type="rect" x={170} y={20} label="Stock" />
                    <FlowNode type="oval" x={320} y={20} label="Check today's stock and plan purchases" />
                    <FlowNode type="rect" x={470} y={20} label="My Suppliers" />
                    <FlowNode type="oval" x={620} y={20} label="Select supplier who wants purchase" />
                    <FlowNode type="rect" x={770} y={20} label="Supplier's Page" />
                    <FlowNode type="oval" x={920} y={20} label="Start a new order" />

                    {/* NODES Row 2 */}
                    <FlowNode type="rect" x={170} y={120} label="Product Search" />
                    <FlowNode type="oval" x={320} y={120} label="Select products that want to buy" />
                    <FlowNode type="rect" x={470} y={120} label="Product Information" />
                    <FlowNode type="oval" x={620} y={120} label="Enter agreed price and quantity" />
                    <FlowNode type="rect" x={770} y={120} label="Order List" />
                    <FlowNode type="rect" x={920} y={120} label="Order Information" />

                    {/* NODES Row 3 */}
                    <FlowNode type="oval" x={170} y={220} label="Check order information" />
                    <FlowNode type="diamond" x={330} y={200} width={100} height={100} label="Is information correct?" />
                    <FlowNode type="oval" x={470} y={220} label="Confirm Purchase" />
                    <FlowNode type="oval" x={620} y={220} label="Order sent to Supplier" />
                    <FlowNode type="oval" x={770} y={220} label="Order arrives" />
                    <FlowNode type="oval" x={920} y={220} label="Check order" />
                    <FlowNode type="rect" x={1070} y={220} label="My Orders" />

                    {/* NODES Row 3 No branch */}
                    <FlowNode type="oval" x={470} y={320} label="Edit order" />
                    <FlowNode type="rect" x={620} y={320} label="Order's Products" />
                    <FlowNode type="oval" x={770} y={320} label="Change quantity / Delete Product" />

                    {/* NODES Row 4 */}
                    <FlowNode type="diamond" x={170} y={400} width={100} height={100} label="Is order okey?" />
                    <FlowNode type="oval" x={320} y={420} label="Confirm delivered products" />
                    <FlowNode type="rect" x={470} y={420} label="QR scan" />
                    <FlowNode type="oval" x={620} y={420} label="Scan QR on products delivered" />
                    <FlowNode type="rect" x={770} y={420} label="Bill sent to administration" />
                    <FlowNode type="oval" x={920} y={420} label="Finish" border="border-red-500" bg="bg-red-500/10 text-red-500 font-bold" />

                    {/* NODES Row 4 No branch */}
                    <FlowNode type="oval" x={320} y={520} label="Report Problem" />
                    <FlowNode type="rect" x={470} y={520} label="Issue Form" />
                    <FlowNode type="oval" x={620} y={520} label="Start another order" />

                 </svg>
              </div>
              
              <div className="mt-8 p-4 border-l-4 border-amber-500 bg-amber-500/10 rounded-r-lg">
                 <h4 className="font-semibold text-amber-500 mb-2">Puntos de decisión clave:</h4>
                 <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
                    <li><strong className="text-foreground">¿Es correcta la información del pedido?</strong> Si no lo es, el flujo requiere editar el pedido cambiando cantidades o borrando productos antes de enviarlo al proveedor.</li>
                    <li><strong className="text-foreground">¿Está bien el pedido al llegar?</strong> Si hay problemas, el flujo requiere reportar el problema emitiendo un formulario antes de iniciar otro pedido.</li>
                 </ul>
              </div>
           </div>
        </motion.div>
      </motion.section>

      <GradientDivider />

      {/* ═══════════════ VISUAL DESIGN ═══════════════ */}
      <motion.section className="mb-20" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>

        {/* High Fi */}
        <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-12 flex items-center gap-3 text-green-500">
           <Smartphone className="h-8 w-8" />
           Visual Design
        </motion.h2>
        
        <motion.div variants={fadeIn} className="mb-24 space-y-32">
           
           {/* Section 1: My Suppliers & Control Panel */}
           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 items-center justify-items-center">
              <div className="xl:col-span-1 space-y-4 text-center xl:text-left xl:mb-40 max-w-sm">
                 <h3 className="text-3xl font-bold text-teal-600">My suppliers</h3>
                 <p className="text-muted-foreground leading-relaxed text-lg">
                    Here we provide a list of all Supermarket's Suppliers, with important information like phone number and local number where they are located.
                 </p>
              </div>
              
              <div className="xl:col-span-1 scale-90 sm:scale-100">
                 <ScreenSuppliers />
              </div>
              
              <div className="xl:col-span-1 scale-90 sm:scale-100 xl:mt-24">
                 <ScreenControlPanel />
              </div>
              
              <div className="xl:col-span-1 space-y-4 text-center xl:text-left xl:mt-40 max-w-sm">
                 <h3 className="text-3xl font-bold text-teal-600">Control Panel</h3>
                 <p className="text-muted-foreground leading-relaxed text-lg">
                    Once we select a supplier, the next screen show us a Control Panel, where we can handle different information about that supplier.
                 </p>
              </div>
           </div>

           {/* Section 2: Negotiate */}
           <div className="space-y-12 bg-slate-50/50 dark:bg-zinc-900/20 p-8 md:p-12 rounded-3xl border border-border/30">
              <div className="max-w-4xl space-y-4">
                 <h3 className="text-3xl font-bold text-teal-600">Negotiate</h3>
                 <p className="text-muted-foreground leading-relaxed text-lg">
                    Items catalog where we can find every product that the Supermarket buys and his current stock on warehouse. Then we can enter agreed price and quantity while negotiate.
                 </p>
              </div>

              <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-center xl:items-start justify-center">
                 <div className="flex flex-col md:flex-row gap-8 lg:gap-10 justify-center scale-90 sm:scale-100 origin-top">
                    <ScreenItemsSearch />
                    <ScreenProductDetail />
                    <ScreenOrderSummary />
                 </div>
                 
                 <div className="max-w-sm xl:max-w-[280px] space-y-4 text-center xl:text-left xl:mt-32">
                    <p className="text-muted-foreground leading-relaxed text-lg border-l-4 border-teal-500 pl-4 py-2 bg-teal-50 dark:bg-teal-950/20 rounded-r-xl">
                       Also, there is the possibility to edit the order after compare all offers. The order list is unique for each supplier.
                    </p>
                 </div>
              </div>
           </div>
           
           {/* Section 3: Claim Management */}
           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 items-center justify-items-center xl:justify-items-start">
              <div className="xl:col-span-1 space-y-4 text-center xl:text-left max-w-sm xl:max-w-md xl:self-center">
                 <h3 className="text-3xl font-bold text-green-600">Claim management</h3>
                 <p className="text-muted-foreground leading-relaxed text-lg">
                    When something is wrong with the order we provide a quick form which is sent to supplier, also we keep a copy who is stored on Supplier's Control Panel to gather information about that kind of problems.
                 </p>
              </div>
              
              <div className="xl:col-span-1 scale-90 sm:scale-100 xl:justify-self-center">
                 <ScreenClaimForm state="dropdown" />
              </div>
              
              <div className="xl:col-span-1 scale-90 sm:scale-100 xl:justify-self-center">
                 <ScreenClaimForm state="photos" />
              </div>
           </div>
           
           {/* Section 4: Warehouse & Chats */}
           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 items-center justify-items-center">
              <div className="xl:col-span-1 space-y-4 text-center xl:text-left xl:mb-40 max-w-sm">
                 <h3 className="text-3xl font-bold text-green-600">Warehouse</h3>
                 <p className="text-muted-foreground leading-relaxed text-lg">
                    On this screen, we provide stock information about all products on the list. With visual aids that advice when some product is low stock for example.
                 </p>
              </div>
              
              <div className="xl:col-span-1 scale-90 sm:scale-100">
                 <ScreenWarehouse />
              </div>
              
              <div className="xl:col-span-1 scale-90 sm:scale-100 xl:mt-24">
                 <ScreenChats />
              </div>
              
              <div className="xl:col-span-1 space-y-4 text-center xl:text-left xl:mt-40 max-w-sm">
                 <h3 className="text-3xl font-bold text-green-600">Chats</h3>
                 <p className="text-muted-foreground leading-relaxed text-lg">
                    Integrated chat for easy contact with suppliers who are using the App if they need to resolve any problem or negotiate some prices.
                 </p>
              </div>
           </div>

        </motion.div>

      </motion.section>

      {/* ═══════════════ CTA ═══════════════ */}
      <motion.section className="text-center py-12" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}>
         <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-green-500">Thank you!</h2>
         <p className="text-muted-foreground mb-8">¿Te interesa saber más sobre este proyecto?</p>
         <div className="flex gap-4 justify-center">
          <a href="mailto:juanseruani@gmail.com" className={cn(buttonVariants({ size: "lg" }), "bg-green-600 hover:bg-green-700 text-white")}>Conversemos</a>
          <Link to="/" className={buttonVariants({ size: "lg", variant: "outline" })}>Volver al Portfolio</Link>
        </div>
      </motion.section>
    </div>
  )
}
