const { createApp, ref, onMounted } = Vue;
createApp({
    setup() {
        const add = ref({});
        const dataCuaHang = ref([]);
        const edit = ref({});
        const del = ref({});
        const fetchData = async () => {
            try {
                const res = await axios.get('/admin/cua-hang/get-data');
                dataCuaHang.value = res.data.data;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        const themMoi = () => {
            axios
                .post('/admin/cua-hang/create', add.value)
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

        const capNhat = () => {
            axios
                .post('/admin/cua-hang/update', edit.value)
                .then((res) => {
                    if(res.data.status == true) {
                        toastr.success(res.data.message, 'success');
                        $("#capNhatModal").modal('hide');
                        fetchData();
                    }
                })
                .catch((res) => {
                    console.log(res.response.data.errors);
                    $.each(res.response.data.errors, function(k, v) {
                        toastr.error(v.msg, 'error');
                    });
                });
        }

        const Xoa = () => {
            axios
                .post('/admin/cua-hang/delete', del.value)
                .then((res) => {
                    if(res.data.status == true) {
                        toastr.success(res.data.message, 'success');
                        $("#deleteModal").modal('hide');
                        fetchData();
                    }
                })
                .catch((res) => {
                    console.log(res.response.data.errors);
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
            edit,
            del,
            dataCuaHang,
            themMoi,
            capNhat,
            Xoa
        };
    },
}).mount('#app');
