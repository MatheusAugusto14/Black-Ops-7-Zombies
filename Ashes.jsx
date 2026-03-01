import {useState} from 'react'

const img = (name)=>/assets/ashes/${name}.png`

const codeNumbers = {
1:["04","13","06","08","13","04"],
2:["11","00","20","13","02","07"],
3:["17","14","02","10","04","19"],
4:["22","04","00","15","14","13"]
}

/* associação topo -> base */
const lineMap = {
1:1,
2:2,
3:3,
4:4,
5:6
}

export default function Ashes({ goBack }){

const [symbols,setSymbols]=useState({A:null,B:null,C:null})
const [lines,setLines]=useState([])
const [code,setCode]=useState(null)
const [memory,setMemory]=useState([])

/* STEP 1 */
const renderSymbolGroup=(loc)=>(

<div style={{marginBottom:25}}>
<h3>Local {loc}</h3>
<div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
{[1,2,3,4].map(n=>{
const name=`${loc}${n}`
const selected=symbols[loc]===n
return(
<img
key={name}
src={img(name)}
onClick={()=>setSymbols({...symbols,[loc]:n})}
style={{
width:90,
height:90,
border:selected?"3px solid red":"2px solid #444",
borderRadius:10,
cursor:"pointer"
}}
/>
)
})}
</div>
</div>
)

/* STEP 2 */
const toggleLine=(n)=>{
const exists = lines.includes(n)
if(exists){
setLines(lines.filter(v=>v!==n))
return
}
if(lines.length===3) return
setLines([...lines,n])
}
const orderOf=(n)=>lines.indexOf(n)+1

/* STEP 4 */
const toggleMemory=(n)=>{
const exists = memory.includes(n)
if(exists){
setMemory(memory.filter(v=>v!==n))
return
}
if(memory.length===4) return
setMemory([...memory,n])
}
const memoryOrder=(n)=>memory.indexOf(n)+1

return(

<div style={{padding:20}}>

<button
onClick={goBack}
style={{
marginBottom:"20px",
background:"#ef4444",
color:"white",
padding:"8px 14px",
borderRadius:"8px",
border:"none",
cursor:"pointer"
}}

>

← Voltar </button>

<h1>Ashes of the Damned</h1>

<h2>Passo 1 — Necrofluid Gauntlet</h2>
{renderSymbolGroup("A")}
{renderSymbolGroup("B")}
{renderSymbolGroup("C")}

{/* STEP 2 */}

<h2>Passo 2 — Sequência de Linhas</h2>

<div style={{
display:"flex",
flexDirection:"column",
gap:12,
margin:"0 auto 25px auto",
width:410
}}>

{[1,2,3,4,5].map(n=>{
const selected=lines.includes(n)
const order=orderOf(n)
return(

<div key={n} style={{position:"relative"}}>
<img
src={img(`linha${n}`)}
onClick={()=>toggleLine(n)}
style={{
width:410,
height:142,
objectFit:"cover",
border:selected?"3px solid red":"2px solid #444",
borderRadius:10,
cursor:"pointer"
}}
/>
{selected && (
<div style={{
position:"absolute",
top:-8,
right:-8,
background:"red",
color:"white",
width:28,
height:28,
borderRadius:"50%",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontWeight:"bold"
}}>
{order}
</div>
)}
</div>
)
})}
</div>

<h3>Resultado</h3>
<div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
{[1,2,3,4,5,6].map(n=>{

const alwaysOn = n===5
const sourceLine = Object.keys(lineMap).find(k=>lineMap[k]===n)
const order = sourceLine ? orderOf(Number(sourceLine)) : null
const active = alwaysOn || lines.includes(Number(sourceLine))

return(

<div key={n} style={{position:"relative"}}>
<img
src={img(`linha${n}A`)}
style={{
width:120,
opacity:active?1:0.25,
border:
alwaysOn ? "3px solid orange" :
active ? "3px solid lime" :
"2px solid #444",
borderRadius:10
}}
/>
{active && order && (
<div style={{
position:"absolute",
top:-8,
right:-8,
background:"lime",
color:"black",
width:28,
height:28,
borderRadius:"50%",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontWeight:"bold"
}}>
{order}
</div>
)}
</div>
)
})}
</div>

{/* STEP 3 */}

<h2>Passo 3 — Código</h2>

<div style={{
display:"flex",
flexDirection:"column",
gap:12
}}>

{[1,2,3,4].map(line=>{
const selected = code === line

return(

<div
key={line}
onClick={()=>setCode(line)}
style={{
display:"flex",
gap:18,
padding:6,
border:selected?"3px solid red":"2px solid #444",
borderRadius:10,
cursor:"pointer",
width:"fit-content"
}}
>
{[1,2,3].map(part=>(
<img
key={part}
src={img(`codigo${line}_${part}`)}
style={{
width:100,
height:80,
objectFit:"cover",
borderRadius:6
}}
/>
))}
</div>
)
})}

</div>

{code && (

<div style={{marginTop:20,display:"flex",gap:10}}>
{codeNumbers[code].map((num,i)=>(
<div key={i} style={{
width:60,
height:60,
background:"#111",
border:"2px solid #555",
borderRadius:10,
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:22,
fontWeight:"bold"
}}>
{num}
</div>
))}
</div>
)}

{/* STEP 4 */}

<h2>Passo 4 — Memória</h2>

<div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
{[1,2,3,4].map(n=>{
const selected=memory.includes(n)
const order=memoryOrder(n)
return(
<div key={n} style={{position:"relative"}}>
<img
src={img(`memoria${n}`)}
onClick={()=>toggleMemory(n)}
style={{
width:382,
height:270,
objectFit:"cover",
border:selected?"3px solid red":"2px solid #444",
borderRadius:10,
cursor:"pointer"
}}
/>
{selected && (
<div style={{
position:"absolute",
top:-8,
right:-8,
background:"red",
color:"white",
width:28,
height:28,
borderRadius:"50%",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontWeight:"bold"
}}>
{order}
</div>
)}
</div>
)
})}
</div>

<p>Sequência: {memory.join(" → ")}</p>

<div style={{height:200}}/>
</div>
)
}
