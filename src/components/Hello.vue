<template>
	<div class="hello">
		<headerApp></headerApp>
		<b-container>
			<router-link to="/add">
				<b-button class="hello__btn btn btn-primary btn-lg">Добавить элемент</b-button>
			</router-link>

			<table class="table table-striped table-hover">
				<thead>
					<tr>
						<th>Название</th>
						<th>Адресс</th>
						<th>Фотография</th>
						<th>Описание</th>
						<th class="table__action"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="point in points">
						<td>
							{{point.name}}
						</td>
						<td>
							{{point.adress}}
						</td>
						<td>
							<img  class="img" 
									v-bind:src="point.photo" 
									:alt="point.name"
									v-on:click="showModalImg( $event.target.src )">
						</td>
						<td>
							{{point.description}}
						</td>
						<td>
							<button class="btn" 
									v-on:click="removePoint(point)">
								<i class="fas fa-trash-alt"></i>
							</button>
							<router-link :to="{ name: 'Edit', params: { id: `${point['.key']}` }}" >
								<button class="btn">   
								<i class="fas fa-edit"></i>  
								</button>
							</router-link>
							<button 	class="btn" 
										v-on:click="showModal( point )"
										v-b-modal.modal1>
								<i class="far fa-comment"></i>
							</button>
						</td> 
					</tr>
				</tbody>
			</table>
			<b-modal ref="modalImg" hide-footer hide-title>
				<img class="imgPopup" :src="srcImg">
			</b-modal>

		</b-container>
		<modalFeedback id="modal1" :parentPoint=pointFeedback > </modalFeedback>

	</div>
</template>

<script>

import {dbRef} from './../firebase/index'
import {dbAuth} from './../firebase/index'
import headerApp from './layout/headerApp'
import modalFeedback from './modal/modalFeedback'

export default {
  name: 'Hello',
  data () {
    return {
			srcImg: '',
			pointFeedback: ''
    }
  },
  components: {
	modalFeedback
  },
  created() {
    this.$bindAsArray('points', dbRef);
  },
  methods: {
    showModal ( point ) {
		this.pointFeedback = point['.key'];
    },
    showModalImg( src ) {
		this.$refs.modalImg.show();
		this.srcImg = src;
    },
    removePoint: function ( point ) {
		let options = {
			reverse: true,
			okText: 'Да',
			cancelText: 'Нет'
			};
		this.$dialog.confirm('Хотите удалить элемент?', options)
			.then(function () {
			dbRef.child( point['.key'] ).remove()
			})
			.catch(function () {
			console.log('Clicked on cancel')
		});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello__btn {
    margin-top: 50px;
    margin-bottom: 20px;
  }
  .img {
    width: 150px;
  }
  .imgPopup {
    width: 470px;
  }
	.table__action {
		width: 165px;
	}
</style>
