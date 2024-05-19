const { createApp, ref, onMounted } = Vue;
createApp({
    setup() {
        const add = ref({});
        const edit = ref({});
        const del = ref({});
        const dataNhomThuoc = ref([]);
        const fetchData = async () => {
            try {
                const res = await axios.get('/admin/nhom-thuoc/get-data');
                dataNhomThuoc.value = res.data.data;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const themMoi = () => {
            axios
                .post('/admin/nhom-thuoc/create', add.value)
                .then((res) => {
                    if(res.data.status == true) {
                        toastr.success(res.data.message, 'success');
                        fetchData();
                        add.value = {};
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
                .post('/admin/nhom-thuoc/update', edit.value)
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
                .post('/admin/nhom-thuoc/delete', del.value)
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
            dataNhomThuoc,
            themMoi,
            capNhat,
            Xoa
        };
    },
}).mount('#app');