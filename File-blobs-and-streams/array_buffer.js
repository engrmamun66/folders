document.addEventListener('DOMContentLoaded', function(ev){
    document.getElementById('btnGo').addEventListener('click', createBlob);
})

function createBlob(ev){
    ev.preventDefault()    
    let log = console.log

    let buffer = new ArrayBuffer(16) 

    let dv1 = new DataView(buffer)
    let dv2 = new DataView(buffer, 10)

    dv1.setInt8(10, 42)
    
    log(dv2.getInt8(0))
    log(dv2.getInt8(1))
    log(dv2.getInt8(2))
    log(dv2.getInt8(3))
    log(dv2.getInt8(4))
    log(dv2.getInt8(5))
    



}