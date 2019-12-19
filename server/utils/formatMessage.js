// TODO
// Add JS docs
module.exports.formatMessage = (type, body) => {
  switch (type) {
    case 'Push Hook': {
      const {
        user_name = '',
        user_avatar = '',
        ref = '',
        project: { name = '', web_url = '' },
        commits = [],
        total_commits_count = 0,
      } = body;
      return {
        attachments: [
          {
            fallback: `${user_name} pushed ${total_commits_count} commit(s) to ${ref} at ${name}`,
            color: '#36a64f',
            pretext: `*${user_name}* pushed ${total_commits_count} commit(s) to *${ref}* at <${web_url}|${name}>:`,
            title: 'Commits:',
            fields: commits.map(({ id, message, url }) => {
              return {
                value: `<${url}|${id.substring(0, 8)}>: ${message}`,
              };
            }),
            footer: 'Gitlab Webhook',
            footer_icon: user_avatar,
            ts: Date.now(),
          },
        ],
      };
    }
    case 'Merge Request Hook': {
      const {
        user: {
          name: user_name = '',
          username: user_username = '',
          avatar_url = '',
        },
        ref = '',
        project: { name: project_name = '', web_url = '' },
        object_attributes: {
          description = '',
          source_branch = '',
          target_branch = '',
          title = '',
          url = '',
        },
        assignees = [],
      } = body;
      return {
        attachments: [
          {
            fallback: `${user_name} submitted a merge request to ${project_name}`,
            color: '#36a64f',
            pretext: `:computer: *${user_name} submitted a merge request to ${project_name}* :computer:`,
            author_name: user_name,
            author_link: `https://gitlab.com/${user_username}`,
            author_icon: avatar_url,
            title,
            title_link: url,
            text: description,
            fields: [
              {
                title: 'Source:',
                value: `<${web_url}/tree/${source_branch}|${source_branch}>`,
                short: true,
              },
              {
                title: 'Target:',
                value: `<${web_url}/tree/${target_branch}|${target_branch}>`,
                short: true,
              },
              {
                title: 'Assignee:',
                value: assignees[0]
                  ? assignees[0].name
                  : 'No one is assigned to this MR',
                short: false,
              },
            ],
            actions: [
              {
                name: 'sub',
                text: 'Subscribe',
                type: 'button',
                value: 'subscribe',
              },
            ],
            footer: 'Gitlab Webhook',
            footer_icon: avatar_url,
            ts: Date.now(),
          },
        ],
      };
    }
    case 'Note Hook': {
      const {
        user: {
          name: user_name = '',
          username: user_username = '',
          avatar_url = '',
        },
        ref = '',
        project: { name: project_name = '', web_url = '' },
        object_attributes: { description = '' },
        merge_request: { title = '', url = '' },
        assignees = [],
      } = body;
      return {
        attachments: [
          {
            fallback: `${user_name} commented on a merge request in ${project_name}`,
            color: '#36a64f',
            pretext: `:speech_balloon: *${user_name} commented on a merge request in ${project_name}* :speech_balloon:`,
            author_name: user_name,
            author_link: `https://gitlab.com/${user_username}`,
            author_icon: avatar_url,
            title,
            title_link: url,
            text: description,
            footer: 'Gitlab Webhook',
            footer_icon: avatar_url,
            ts: Date.now(),
          },
        ],
      };
    }
    case 'Pipeline Hook': {
      const {
        user: {
          name: user_name = '',
          username: user_username = '',
          avatar_url = '',
        },
        project: { name: project_name = '' },
        object_attributes: { ref = '' },
        builds = [],
      } = body;
      return {
        attachments: [
          {
            fallback: `A pipeline triggered by *${user_name}* on branch *${ref}* in ${project_name} has failed!`,
            color: '#36a64f',
            pretext: `:warning: A pipeline triggered by ${user_name} on branch *${ref}* in ${project_name} has failed! :warning:`,
            fields: builds
              .filter(({ status }) => status === 'failed')
              .map(({ name, status }) => {
                return {
                  title: name,
                  value: status,
                  short: true,
                };
              }),
            footer: 'Gitlab Webhook',
            footer_icon: avatar_url,
            ts: Date.now(),
          },
        ],
      };
    }
    default:
      return {};
  }
};
