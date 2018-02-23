<?php


namespace Minds\Core\Email;

use Minds\Core;
use Minds\Core\Entities;
use Minds\Core\Data;
use Minds\Core\Analytics\Timestamps;


class EmailSubscribersIterator
{
    private $cursor = -1;

    private $campaign;
    private $topic;
    private $value;
    private $token;

    private $limit = 2000;
    private $offset = "";
    private $data = [];

    private $valid = true;

    /** @var Repository */
    private $repository;
    private $position = 0;

    public function __construct($repository = null)
    {
        $this->repository = $repository ?: Core\Di\Di::_()->get('Email\Repository');
        $this->position = 0;
    }

    /**
     * @param mixed $campaign
     * @return EmailSubscribersIterator
     */
    public function setCampaign($campaign)
    {
        $this->campaign = $campaign;
        return $this;
    }

    /**
     * @param mixed $topic
     * @return EmailSubscribersIterator
     */
    public function setTopic($topic)
    {
        $this->topic = $topic;
        return $this;
    }

    /**
     * @param mixed $value
     * @return EmailSubscribersIterator
     */
    public function setValue($value)
    {
        $this->value = $value;
        return $this;
    }


    public function setOffset($offset = '')
    {
        $this->offset = $offset;
    }


    /**
     * Fetch all the users who are subscribed to a certain email campaign/topic
     */
    protected function getSubscribers()
    {
        $options = [
            'campaign' => $this->campaign,
            'topic' => $this->topic,
            'value' => $this->value,
            'limit' => $this->limit,
            'offset' => $this->offset
        ];

        $result = $this->repository->getList($options);

        if (!$result || count($result['data'] === 0)) {
            $this->valid = false;
            return;
        }

        $this->token = $result['token'];

        $guids = array_map(function ($item) {
            return $item->getUserGuid();
        }, $result['data']);

        $this->valid = true;
        $this->data = Entities::get(['guids' => $guids]);
    }

    /**
     * Rewind the array cursor
     * @return null
     */
    public function rewind()
    {
        if ($this->cursor >= 0) {
            $this->getSubscribers();
        }
        $this->next();
    }

    /**
     * Get the current cursor's data
     * @return mixed
     */
    public function current()
    {
        return $this->data[$this->cursor];
    }

    /**
     * Get cursor's key
     * @return mixed
     */
    public function key()
    {
        return $this->cursor;
    }

    /**
     * Goes to the next cursor
     * @return null
     */
    public function next()
    {
        $this->cursor++;
        if (!isset($this->data[$this->cursor])) {
            $this->getSubscribers();
        }
    }

    /**
     * Checks if the cursor is valid
     * @return bool
     */
    public function valid()
    {
        return $this->valid && isset($this->data[$this->cursor]);
    }
}