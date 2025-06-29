<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useAuthStore } from '~/store/auth'
import { useForm } from 'vee-validate'
import { toast } from './ui/toast'
import { FormField } from './ui/form'
import FormItem from './ui/form/FormItem.vue'
import FormLabel from './ui/form/FormLabel.vue'
import FormControl from './ui/form/FormControl.vue'
import FormMessage from './ui/form/FormMessage.vue'

const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { login } = authStore
const isSubmitting = ref(false)
const loginError = ref('')

const formSchema = toTypedSchema(z.object({
  identifier: z.string().email(),
  password: z.string().min(6)
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    identifier: '',
    password: ''
  }
})
  
const onSubmit = form.handleSubmit(async (values) => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  loginError.value = ''
  
  try {
    // Call login method from auth store
    await login({
      email: values.identifier,
      password: values.password
    })
    
    toast({
      description: 'Berhasil login'
    })
    
    setTimeout(() => {
      router.push('/')  
    }, 500);

  } catch (error: any) {
    toast({
      variant: 'destructive',
      title: `${error.message.includes('401') ? 'Email atau password tidak valid' : error.message}`
    })

    console.error('Login failed:', error)
    loginError.value = error.message.includes('401') ? 'Email atau password tidak valid' : error.message
    
  } finally {
    isSubmitting.value = false
  }
})

onMounted(() => {
  const baseURL = process.env.NUXT_BASE_URL
  
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card class="overflow-hidden">
      <CardContent class="grid p-0 md:grid-cols-2">
        <form class="p-6 md:p-8" @submit.prevent="onSubmit">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col items-center text-center">
              <h1 class="text-2xl font-bold">
                Welcome back
              </h1>
              <p class="text-balance text-muted-foreground">
                Login to your Indys Food account
              </p>
            </div>
            <FormField v-slot="{ componentField }" name="identifier">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Alamat Email"
                    v-bind="componentField" 
                    :disabled="isSubmitting" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    v-bind="componentField" 
                    :disabled="isSubmitting" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <Button type="submit" class="w-full" :disabled="isSubmitting">
              {{ isSubmitting ? 'Loging In...' : 'Login' }}
            </Button>
          </div>
        </form>
        <div class="relative hidden bg-muted md:block">
          <img
            src="/placeholder.svg"
            alt="Image"
            class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          >
        </div>
      </CardContent>
    </Card>
    <div class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
      By clicking continue, you agree to our <a href="#">Terms of Service</a>
      and <a href="#">Privacy Policy</a>.
    </div>
  </div>
</template>
