<template id="field-photo">
    <div>
        <button     class="btn btn-primary btn__upload" 
                    v-on:click.prevent="onPickFile">
                    Upload image
        </button>

        <input      type="file" 
                    style="display:none"
                    ref="fileInput"
                    accept="image/*"
                    class="form-control-file" 
                    id="files"
                    multiple
                    v-on:change="onFilePicked"
                    >

        <div        class="progress-bar progress-bar-striped"
                    :style="{ width:  upload + '%'}">   
                    {{ progressUpload }}%
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import {dbStorage} from './../../firebase/index'

    export default Vue.component('fieldPhoto', {
        template: '#field-photo',
        props: [ 'onPhoto' , 'upload' ],
        data: function () {
            return {
                progressUpload: this.upload,
                downloadURL: ''
            }
        },
        methods: {
            onPickFile() {
                this.$refs.fileInput.click()
            },
            onFilePicked () {
                this.file = document.getElementById("files").files[0];
                var storageRef = dbStorage.ref('img/' + Date.now() + this.file.name);

                this.task = storageRef.put(this.file);
                this.task.on('state_changed', sp => {
                    this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
                });
                this.task.then((snapshot) => {
                    this.downloadURL = snapshot.metadata.downloadURLs[0];
                    this.$emit('onFilePicked', {
                        downloadURL: this.downloadURL,
                        progressUpload: this.progressUpload 
                    })
                });
            }
        }
    })
</script>

<style scoped>
    .btn__upload {
        margin-bottom: 15px;
    }
</style>