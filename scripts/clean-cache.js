const { execSync } = require('child_process')
const os = require('os')

function cleanCache() {
  const isWindows = os.platform() === 'win32'
  const npmCommand = 'pnpm next-sitemap'
  const removeCacheCommand = isWindows ? 'rmdir /s /q .next\\cache' : 'rm -rf .next/cache'

  try {
    // Run next-sitemap
    execSync(npmCommand, { stdio: 'inherit', shell: true })
    console.log('✓ next-sitemap completed successfully')
  } catch (error) {
    console.error('Error running next-sitemap:', error.message)
    process.exit(1)
  }

  try {
    // Try to remove cache, but don't fail if it's locked or busy
    execSync(removeCacheCommand, { stdio: 'inherit', shell: true })
    console.log('✓ Cache directory removed successfully')
  } catch (error) {
    // In CI/CD environments like Railway, the cache might be locked
    // This is not critical, so we just log a warning instead of failing
    console.warn('⚠ Could not remove cache directory (this is OK in deployment environments):', error.message)
  }
}

cleanCache()
