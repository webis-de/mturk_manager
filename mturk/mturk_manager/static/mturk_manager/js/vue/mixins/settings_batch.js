import { DESCRIPTIONS } from '../classes/enums';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import Settings_Batch from '../classes/settings_batch';
import { required, minValue, maxValue } from 'vuelidate/lib/validators'
export default {
	data() {
		return {
			settings_batch: new Settings_Batch(),
            DESCRIPTIONS: DESCRIPTIONS,
		}
	},
    watch: {
        // project: { 
        //     handler: function() {
        //         this.$emit('update:project', this.settings_batch);
        //     },
        //     deep: true,
        // },
    },
	methods: {
        update_fields() {
            if(this.settings_batch_current != undefined)
            {
                this.settings_batch = new Settings_Batch(this.settings_batch_current);
                
                // this.settings_batch.name = this.settings_batch_current.name;

                // this.settings_batch.title = this.settings_batch_current.title;
                // this.settings_batch.description = this.settings_batch_current.description;
                // this.settings_batch.reward = this.settings_batch_current.reward;
                // this.settings_batch.count_assignments = this.settings_batch_current.count_assignments;
                // this.settings_batch.count_assignments_max_per_worker = this.settings_batch_current.count_assignments_max_per_worker;
                // this.settings_batch.lifetime = this.settings_batch_current.lifetime;
                // this.settings_batch.duration = this.settings_batch_current.duration;
                // this.settings_batch.keywords = JSON.parse(JSON.stringify(this.settings_batch_current.keywords));
                // this.settings_batch.block_workers = this.settings_batch_current.block_workers;
                // this.settings_batch.template = this.settings_batch_current.template;
                
                // this.settings_batch.has_content_adult = this.settings_batch_current.has_content_adult;
                // this.settings_batch.qualification_assignments_approved = this.settings_batch_current.qualification_assignments_approved;
                // this.settings_batch.qualification_hits_approved = this.settings_batch_current.qualification_hits_approved;
                // this.settings_batch.qualification_locale = JSON.parse(JSON.stringify(this.settings_batch_current.qualification_locale));
            } else {
                this.settings_batch = new Settings_Batch();
            }

        },  
        ...mapActions('moduleKeywords', {
            'load_keywords': 'load_keywords',
        }),
	},
    created() {
        this.update_fields();
        this.load_keywords();
    },
    computed: {
        ...mapGetters('moduleProjects', {
            'project_current': 'get_project_current',
        }),
    },
    validations() {
        const validations = {
            settings_batch: {
                name: {
                    required,
                },
                title: {
                    required,
                },
                description: {
                    required,
                },
                reward: {
                    required,
                    minValue: minValue(0),
                },
                count_assignments: {
                    required,
                    minValue: minValue(0),
                },
                count_assignments_max_per_worker: {
                    minValue: minValue(0),
                },
                lifetime: {
                    required,
                    minValue: minValue(0),
                },
                duration: {
                    required,
                    minValue: minValue(30),
                    maxValue: maxValue(31536000),
                },
                template: {
                    required,
                },
                block_workers: {
                    required,
                },
                keywords: {
                },
                has_content_adult: {
                },
                qualification_assignments_approved: {
                    minValue: minValue(0),
                    maxValue: maxValue(100),
                },
                qualification_hits_approved: {
                    minValue: minValue(0),
                },
                qualification_locale: {
                },
            },
        }

        if(this.name_not_required)
        {
            validations.settings_batch.name = {};
        }

        return validations;
    },
}