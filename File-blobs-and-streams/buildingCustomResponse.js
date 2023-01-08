document.addEventListener('DOMContentLoaded',function(){
    // createImageResponse()
    createMutiImageResponse()

})

function createImageResponse(){
    let input  = document.getElementById('uploader')
    input.addEventListener('change', async function(ev){
        let input = ev.target
        file = input.files[0]
        let response = new Response(file, {
            status: 200,
            statusText: 'OK',
            headers:{
                'content-type': file.type,
                'content-length': file.size,
            }
        }) 
        let copy = response.clone()
        console.log(copy);
        // Get image from response
        let blob = await copy.blob();
        let url = URL.createObjectURL(blob)
        console.log(blob.type, blob.size, blob.stream());
        let image = document.getElementById('image')
        image.src = url
    })
}


// const selectedFiles = event.target.files;
//     for (let i = 0; i < selectedFiles.length; i++) {
//     this.images.push(selectedFiles[i]);
//     let reader = new FileReader();
//     reader.onload = (e) => {
//         this.previewFiles[i] = reader.result;//make base 64 encoded
//     };
//     reader.readAsDataURL(selectedFiles[i]);
// }
function createMutiImageResponse(){
    let input  = document.getElementById('uploader')
    input.addEventListener('change', async function(ev){
        let input = ev.target
        let files = input.files
       

         
        console.log(files.length);
        for(let i=0;i<files.length;i++){
            let file = files[i]
            var d = 0
            let response = new Response(file, {
                status: 200,
                statusText: 'OK',
                headers:{
                    'content-type': file.type,
                    'content-length': file.size,
                }
            }) 
            let copy = response.clone()         
           
            let blob = await copy.blob();
            let url = URL.createObjectURL(blob)    
            
            // With DOM Element
            let previewDiv = document.createElement('div')
            previewDiv.classList = 'preview-section'
            previewDiv.style.position = 'relative'
            previewDiv.style.width = '200px'

            let img  = document.createElement('img')
            img.src = url   
            img.width = 200 
            
            previewDiv.append(img)

            let span  = document.createElement('span')
            span.textContent = file.name
            span.className = 'One'
            span.innerHTML = '<span class="delete" style="font-family:sans-serif;position:absolute;top:0;right:-10px;cursor:pointer;padding:8px;background:white;border-radius:50%">X</span>'
            previewDiv.append(span)
            span.addEventListener('click',function(event){
                console.log(i,files);
                delete files[0]
                console.log(files[0]);
                event.currentTarget.parentNode.remove()
                
            })

            document.querySelector('body').append(previewDiv)
        } 
        
    })
}