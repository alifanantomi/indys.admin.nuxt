<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { LANG } from '@/lib/types/i18n'

const { setLocale, t } = useI18n()

const lang = useCookie<boolean>('lang', {
  default: () => false,
  maxAge: 60 * 60 * 24 * 365,
})

const toggleLang = () => {
  lang.value = !lang.value

  if (lang.value) {
    setLocale(LANG.ENGLISH)
  } else {
    setLocale(LANG.INDONESIA)
  }
}

const menuList = ref([
  {
    name: 'dashboard',
    href: '/'
  },
  {
    name: 'orders',
    href: '/orders'
  },
  {
    name: 'menus',
    href: '/menus'
  },
  {
    name: 'users',
    href: '/users'
  },
  {
    name: 'settings',
    href: '/settings'
  }
])

onMounted(() => {
  if (lang.value) {
    setLocale(LANG.ENGLISH)
  } else {
    setLocale(LANG.INDONESIA)
  }
})

</script>

<template>
  <div class="flex justify-between items-center px-12 py-4 border-b-[1px]">
    <div class="flex items-center gap-6">
      <h1 class="text-lg font-semibold">Indys Food</h1>

      <Separator orientation="vertical" class="h-5" />
      
      <div class="flex items-center gap-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem v-for="(menu, index) in menuList" :key="index">
              <NuxtLink v-slot="{ isActive, href, navigate }" :to="menu.href" custom>
                <NavigationMenuLink class="font-normal data-[active]:font-semibold" :active="isActive" :href :class="navigationMenuTriggerStyle()" @click="navigate">
                  {{ t(menu.name) }}
                </NavigationMenuLink>
              </NuxtLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="flex items-center space-x-2">
        <Label for="lang">ID</Label>
        <Switch id="lang" :model-value="lang" @update:model-value="toggleLang" />
        <Label for="lang">EN</Label>
      </div>
  
      <ThemesDropdown />

      <ProfileDropdown />
    </div>
    
  </div>
</template>