const { createApp, ref, onMounted } = Vue;
createApp({
    setup() {
        const user = ref({});
        const Login = () => {
            axios
                .post('/login', user.value)
                .then((res) => {
                    if (res.data.status == 1) {
                        toastr.success(res.data.message, 'success');
                        setInterval(() => {
                            window.location.href = "/admin"
                        }, 1500);
                    }
                })
                .catch((res) => {
                    $.each(res.response.data.errors, function(k, v) {
                        toastr.error(v.msg, 'error');
                    });
                });
        }

        onMounted(() => {
            console.log(123);
        });
        return {
            user,
            Login
        };
    },
}).mount('#app');
