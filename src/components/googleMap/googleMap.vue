<template id="google-map">
    <div>
        <input  type="text"
                ref="autocomplete"
                class="form-control form-autocomplete"
                v-bind:value="value"/>

        <div id="map"></div>
    </div>
</template>

<script>
import Vue from 'vue'

export default Vue.component('googleMap', {
        template: '#google-map',
        props: [ 'onLocation', 'value', 'latitude', 'longitude' ],
        data: function () {
            return {
                myLatLng: {
                    lat: this.latitude,
                    lng: this.longitude
                },
                mapName: 'map',
                adress: ''
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            init () {
                var map;
                map = new google.maps.Map(document.getElementById(this.mapName), {
                    zoom: 5,
                    center: {lat: 50.00, lng: 30.18}
                })
                var options = {
                    bounds: defaultBounds,
                    types: ['address'],
                    componentRestrictions: {country: 'ua'}   
                }
                var defaultBounds = new google.maps.LatLngBounds(
                    new google.maps.LatLng(48.37, 22.18),
                    new google.maps.LatLng(50.00, 35.15)
                )
                var autocomplete = new google.maps.places.Autocomplete( this.$refs.autocomplete,
                    options);
                autocomplete.bindTo('bounds', map);
                if (( this.myLatLng.lat === undefined) && ( this.myLatLng.lng === undefined)) {
                    this.myLatLng.lat = 0;
                    this.myLatLng.lng = 0;
                }
                var marker = new google.maps.Marker({
                    map: map,
                    position: { 
                        lat: this.myLatLng.lat, 
                        lng: this.myLatLng.lng
                    },
                    anchorPoint: new google.maps.Point(0, -29),
                    draggable: true
                });
                autocomplete.addListener('place_changed', () => {
                    marker.setVisible(false);

                    var places = autocomplete.getPlace();
                    this.myLatLng.lat = places.geometry.location.lat();
                    this.myLatLng.lng = places.geometry.location.lng();

                    this.adress = '';
                    if (places.address_components) {
                        this.adress = [
                        (places.address_components[2] && places.address_components[2].short_name || ''),
                        
                        (places.address_components[1] && places.address_components[1].short_name || ''),
                        (places.address_components[0] && places.address_components[0].short_name || '')
                        ].join(', ');
                    }
                    map.fitBounds(places.geometry.viewport);
                    marker.setPosition(places.geometry.location);
                    marker.setVisible(true);
                    this.$emit('init', {
                        lat: this.myLatLng.lat,
                        lng: this.myLatLng.lng,
                        adress: this.adress
                    })
                });

                google.maps.event.addListener(marker, 'dragend', (event) => {
                    this.myLatLng.lat = marker.getPosition().lat();
                    this.myLatLng.lng = marker.getPosition().lng();
                    this.$emit('init', {
                        lat: this.myLatLng.lat,
                        lng: this.myLatLng.lng,
                        adress: this.adress
                    })
                });

                marker.addListener('click', function() {
                    map.setZoom(18);
                    map.setCenter(marker.getPosition());
                });
                
            },
            updateValue: function ( value ) {
                this.$emit('input', value )
            }
        }
    })
</script>

<style scoped>
    #map {
        height: 350px;
        width: 500px;
        margin: 0 auto;
        background: gray;
    }
    .form-autocomplete {
        margin-top: 15px;
        width: 500px;
        margin: 0 auto;
    }
</style>