import React from 'react'
import renderer from 'react-test-renderer'
import VideoRemote from './index'
import '@testing-library/jest-dom/extend-expect'
import MainService from '@/services/main'

describe('VideoRemote', () => {
  it('Match Snapshot', () => {
    const main = {
      self: {
        name: 'isystk',
      },
      members: {
        aaa: {
          connectionId: 'aaa',
          name: 'aaa',
          photo: 'images/friends/BigBoss.png',
        },
        bbb: {
          connectionId: 'bbb',
          name: 'bbb',
          photo: 'images/friends/David.png',
        },
      },
    } as MainService
    const component = renderer.create(
      <VideoRemote main={main} member={main.members['aaa']} />
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
