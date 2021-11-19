import {
    Input,
    Form,
    FormItem,
    Message,
    Button,


} from 'element-ui'
const element = {
    install: function (Vue) {
        Vue.use(Input)
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Button)


        Vue.prototype.$message = Message;

    }
}

export default element

