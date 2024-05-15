const { createApp, ref, onMounted } = Vue;
createApp({
    setup() {
        const add = ref({});
        const dataDonVi = ref([]);
        const fetchData = async () => {
            try {
                const res = await axios.get('/admin/don-vi/get-data');
                dataDonVi.value = res.data.data;
                console.log(dataDonVi.value);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const themMoi = () => {
            axios
                .post('/admin/don-vi/create', add.value)
                .then((res) => {
                    if(res.data.status == true) {
                        toastr.success(res.data.message, 'success');
                        fetchData();
                    }
                })
                .catch((res) => {
                    $.each(res.response.data.errors, function(k, v) {
                        toastr.error(v.msg, 'error');
                    });
                });
        }
        onMounted(() => {
            fetchData();
        });
        return {
            add,
            themMoi,
            dataDonVi,
        };
    },
}).mount('#app');