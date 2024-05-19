module.exports = {
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'cesque',
                    name: 'ezlo'
                },
                prerelease: false,
                draft: true
            }
        }
    ]
}