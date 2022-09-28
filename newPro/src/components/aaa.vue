<template>
  <button @click="childEmmit">{{msg}}</button>
</template>

<script>
import { computed } from '@vue/reactivity';
export default {
    props:{
        msg:{
            type:Number,
            default:123
        }
    },
    setup(props,context){
       const childEmmit=()=>{
           context.emit("my-emmit",10)
       };
       const msg=computed(()=>{
           return props.msg
       })
       return{
           childEmmit,
           msg
       }
    }
}
</script>

<style>
span{

}
</style>