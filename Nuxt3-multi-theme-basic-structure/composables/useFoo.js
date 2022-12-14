function Foo(functionName='', ...args){
  const methods = {
    updateFoo (fff) {
      let foo = useState('foo-new')
      console.log(foo.value.accessToken);
      foo.value.accessToken = fff
      console.log(foo.value.accessToken);
     },
     returnTrue(){return true}
  }

  if(functionName && methods.hasOwnProperty(functionName)){
    methods[functionName](...args) 
  }else{
    return methods
  }
}

export {Foo}

export default function () {
  return useState('foo-new', () => ({
    accessToken: 'dked434544434',
    user: null,
  }))
}
